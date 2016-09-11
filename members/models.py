from logging import getLogger

import hashlib
from django.contrib.auth.models import User, Group
from django.db import models
from django.utils import timezone
from frontend.settings import MEDIA_URL

logger = getLogger(__name__)


class AcademicYear(models.Model):
    start = models.DateField(verbose_name='Date de début')
    stop = models.DateField(verbose_name='Date de fin')
    slug = models.CharField(max_length=4)
    active = models.BooleanField(default=False)

    def is_current(self):
        return self.active

    def get_comite(self):
        return self.comitemembership_set.filter(
            poste__is_bapteme=False).order_by('-poste__weight')

    def get_toge_bapteme(self):
        return self.comitemembership_set.filter(poste__is_bapteme=True).exclude(
            poste__slug__in=['bleu', 'TC']).order_by('-poste__weight')

    def get_toge_cercle(self):
        return self.comitemembership_set.filter(poste__is_bapteme=True).exclude(
            poste__slug__in=['bleu', 'TB', 'PDB', 'VP']).order_by(
            '-poste__weight')

    def get_bleu(self):
        return self.comitemembership_set.filter(poste__is_bapteme=True).exclude(
            poste__slug__in=['TB', 'PDB', 'VP', 'TC']).order_by(
            '-poste__weight')

    def get_all_cat(self):
        vals = []
        vals.append(('Comité de Cercle', self.get_comite()))
        vals.append(('Comité de Baptême', self.get_toge_bapteme()))
        vals.append(('Toges de Cercle', self.get_toge_cercle()))
        vals.append(('Bleus', self.get_bleu()))
        return vals

    def get_next_year(self):
        return self.get_next_by_start()

    def get_previous_year(self):
        return self.get_previous_by_start()

    def __str__(self):
        return "%s - %s" % (self.start.strftime('%Y'), self.stop.strftime('%Y'))

    class Meta:
        verbose_name = "Année académique"
        ordering = ['-start']


class Member(models.Model):
    # link to the django user
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    # picture
    avatar = models.ImageField(upload_to='images/members',
                               blank=True,
                               null=True,
                               verbose_name="avatar")
    # wiki_page
    wiki = models.URLField(blank=True,
                           null=True)
    # birthdate
    birthdate = models.DateField(blank=True,
                                 null=True,
                                 verbose_name="date de naissance")
    # Additionnal Info
    extra_info = models.TextField(default='', blank=True)

    def firstname(self):
        """

        Returns: the user firstname

        """
        return "" if not self.user else self.user.first_name

    def lastname(self):
        """

        Returns: the user lastname

        """
        return "" if not self.user else self.user.last_name

    def username(self):
        """
        Returns: the user username if a user is linked, otherwise
        the preferred surname
        """
        if self.user:
            return self.user.username
        return self.surname_set.get(is_prefered=True)

    def is_baptised(self):
        """
        Check weither the member is baptised or not
        Returns: A boolean value
        """
        return True if self.baptised_year else False

    def cercle_carreer(self):
        """
        Returns: the list of role taken in the comite by the member
        """
        return self.comitemembership_set.filter(
            poste__is_bapteme=False
        ).order_by('year__start')


    def bapteme_carreer(self):
        """
        Returns: the list of role taken in the bapteme by the member
        """
        return self.comitemembership_set.filter(
            poste__is_bapteme=True
        ).order_by('year__start')

    def admin_image(self):
        """Returns: an html element to display an image in the admin"""
        return "<img src={} style='width: 60px;' >".format(self.image_url)

    admin_image.allow_tags = True

    def is_active_comite(self):
        """
        Wether the member is in the current comite or not
        """
        poste = self.comitemembership_set.filter(
            poste__is_bapteme=False
        ).filter(
            year__active=True
        )
        return len(poste) > 0

    def has_custom_permission(self, permission):
        # first we get all the permissions_linked
        permission_set = CustomPermissionsManager.objects.filter(
            permission=permission)
        find = False
        i = 0
        permission_rel = permission_set.all()
        while not find and i < len(permission_rel):
            perm_rem = permission_rel[i]
            if perm_rem.users.filter(id=self.user.id).exists():
                find = True
            if not find:
                intersect = self.user.groups.all() & perm_rem.groups.all()
                if len(intersect) > 0:
                    find = True
            if find:
                if perm_rem.expiration_date:
                    if perm_rem.expiration_date < timezone.now():
                        find = False
            i += 1
        return find

    def surnames(self):
        return self.surname_set.all()

    @property
    def image_url(self):
        """

        Returns: The picture of the user, a custom one, a gravatar, or the
        default one

        """
        if self.avatar:
            return self.avatar.url
        if self.user:
            mail = self.user.email.lower().encode('utf8')
            gravatar_url = "//www.gravatar.com/avatar/"
            gravatar_url += hashlib.md5(mail).hexdigest()
            gravatar_url += "?s=300&d=http%3A%2F%2Fcerkinfo.be%2F" \
                            "media%2F%2Fimages%2Fmembers%2Fdefault-person.png"
            return gravatar_url
        return MEDIA_URL + "/images/members/default-person.png"

    def __str__(self):
        if self.user:
            if self.user.first_name or self.user.last_name:
                return "%s %s" % (self.user.first_name, self.user.last_name)
        return "%s" % self.username()


class SurName(models.Model):
    """
    Represent the different surname of a member.
    A user can have as many surnames has he wants
    and can chose which of them is his preferred
    """
    # The member which it belongs
    member = models.ForeignKey(Member)
    value = models.CharField(max_length=250)
    is_prefered = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.value)


class ComitePoste(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=5)
    email = models.EmailField(blank=True)
    is_bureau = models.BooleanField(default=False)
    is_bapteme = models.BooleanField(default=False)
    weight = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Poste dans le comité"
        ordering = ['-weight']


class ComiteMembership(models.Model):
    """
    Link a user to his member card, his post in the comite during
    that year and weither or not he has paid his year fee.
    """
    year = models.ForeignKey(AcademicYear, verbose_name='year')
    member = models.ForeignKey(Member, null=True, blank=True)
    postes = models.ManyToManyField(ComitePoste, related_name='membership')
    card_id = models.IntegerField(default=-1)
    paid = models.BooleanField(blank=False, default=False)

    class Meta:
        ordering = ['year']


class CustomPermission(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = "Permission"


class CustomPermissionsManager(models.Model):
    groups = models.ManyToManyField(Group, blank=True)
    users = models.ManyToManyField(User, blank=True)
    expiration_date = models.DateTimeField(null=True, blank=True)
    permission = models.ForeignKey(CustomPermission)
    def __str__(self):
        return "%s" % self.permission.name

    class Meta:
        verbose_name = "Permissions Manager"

