from logging import getLogger

from django.contrib.auth.models import User
from django.db import models

logger = getLogger(__name__)

class Member(models.Model):
    # link to the django user
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # basic info
    firstName = models.CharField(max_length=50,
                                 blank=True,
                                 null=True,
                                 verbose_name="prénom")
    lastName = models.CharField(max_length=50,
                                blank=True,
                                null=True,
                                verbose_name="nom")
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

