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