from logging import getLogger

import hashlib
import random
import string
from django.contrib.auth.models import User, Group
from django.db import models
from django.utils import timezone
from frontend.settings import MEDIA_URL

logger = getLogger(__name__)


def card_generator():
    pool = string.ascii_letters + string.digits
    return ''.join([random.choice(pool) for _ in range(6)])


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
    # card_id
    card_id = models.CharField(default=card_generator, unique=True, editable=True, max_length=6)
    # Additionnal Info
    extra_info = models.TextField(default='', blank=True)

    balance = models.DecimalField(null=True, max_digits=5, decimal_places=2, default=0)

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
        return bool(self.baptised_year)

    def cercle_carreer(self):
        """
        Returns: the list of role taken in the comite by the member
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=False,
        ).order_by('year__start')

        for c in comite:
            c.poste = c.postes.get(is_bapteme=False)

        return comite

    def bapteme_carreer(self):
        """
        Returns: the list of role taken in the bapteme by the member
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=True,
        ).order_by('year__start')

        for c in comite:
            c.poste = c.postes.get(is_bapteme=True)

        return comite

    def admin_image(self):
        """
        Returns: an html element to display an image in the admin
        """
        return "<img src={} style='width: 60px;' >".format(self.image_url)

    admin_image.allow_tags = True

    def is_active_comite(self):
        """
        Wether the member is in the current comite or not
        """
        poste = self.comitemembership_set.filter(
            postes__is_bapteme=False
        ).filter(
            year__active=True
        )
        return len(poste) > 0

    def has_custom_permission(self, permission):
        """
        """
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

    def get_transaction(self):
        """
        """
        return self.transaction_user.all()

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
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    value = models.CharField(max_length=250)
    is_prefered = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.value)


class AcademicYear(models.Model):
    """
    @desc: Représente une année académique. Surtout utile pour acceder
        facilement aux éléments relatif à une année académique.
    """
    start = models.DateField(verbose_name='Date de début')
    stop = models.DateField(verbose_name='Date de fin')
    slug = models.CharField(max_length=4)
    active = models.BooleanField(default=False)

    def is_current(self):
        """
        @desc: Si l'année est celle qui est en cours.
        """
        return self.active

    def get_comite(self):
        """
        @desc: Renvoie le comité de l'année

        @note: Cette fonction crée une nouvelle entrée "poste"
            qui permet d'acceder aux informations du poste du
            comité.
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=False
        ).order_by('-postes__weight')

        for c in comite:
            c.poste = c.postes.get(is_bapteme=False)

        return comite

    def get_toge_bapteme(self):
        """
        @desc: Renvoie les toges de baptême de l'année.

        @note: Cette fonction crée une nouvelle entrée "poste"
            qui permet d'acceder aux informations du poste.
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=True
        ).exclude(
            postes__slug__in=['bleu', 'TC']
        ).order_by('-postes__weight')

        for c in comite:
            c.poste = c.postes.get(is_bapteme=True)

        return comite

    def get_toge_cercle(self):
        """
        @desc: Renvoie les toges de cercle de l'année.

        @note: Cette fonction crée une nouvelle entrée "poste"
            qui permet d'acceder aux informations du poste.
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=True
        ).exclude(
            postes__slug__in=['bleu', 'TB', 'PDB', 'VP']
        ).order_by('-postes__weight')

        for c in comite:
            c.poste = c.postes.first()

        return comite

    def get_bleu(self):
        """
        @desc: Renvoie les bleus de l'année.

        @note: Cette fonction crée une nouvelle entrée "poste"
            qui permet d'acceder aux informations du poste.
        """
        comite = self.comitemembership_set.filter(
            postes__is_bapteme=True
        ).exclude(
            postes__slug__in=['TB', 'PDB', 'VP', 'TC']
        ).order_by('-postes__weight')

        for c in comite:
            c.poste = c.postes.get(is_bapteme=True)

        return comite

    def get_all_cat(self):
        """
        @desc: Renvoie le comité, toges de cercle, toges de baptême
            et bleus de l'année.

        @note: Cette fonction crée une nouvelle entrée "poste"
            pour chaque catégorie qui permet d'acceder aux
            informations du poste.
        """
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


class ComitePoste(models.Model):
    """
    Représente un poste au sein de cerkinfo que
    ce soit folklorique ou non.
    """
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
    Lie un utilisateur à une année académique. Les informations
    relative à une année académique sont:
        * Les postes folklorique ou non.
        * Le membership si il l'a payé.
    """
    member = models.ForeignKey(Member, null=True, blank=True, on_delete=models.CASCADE)
    year = models.ForeignKey(AcademicYear, verbose_name='year', on_delete=models.CASCADE)
    postes = models.ManyToManyField(ComitePoste, related_name='membership')
    paid = models.BooleanField(blank=False, default=False)

    def get_bureau(self):
        """
        @desc: Renvoie le poste du bureau.
        """
        return self.postes.get(is_bureau=True)

    def get_comite(self):
        """
        @desc: Renvoie le poste du comité.
        """
        return self.postes.get(is_bapteme=False)

    def get_bapteme(self):
        """
        @desc: Renvoie le poste du baptême.
        """
        return self.postes.get(is_bapteme=True)

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
    permission = models.ForeignKey(CustomPermission, on_delete=models.CASCADE)

    def __str__(self):
        return "%s" % self.permission.name

    class Meta:
        verbose_name = "Permissions Manager"
