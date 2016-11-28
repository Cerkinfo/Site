# -*- coding: utf-8 -*-
# Generated by Django 1.9.11 on 2016-11-28 15:25
from __future__ import unicode_literals

from django.db import migrations, models
import members.models


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0008_remove_member_card_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='card_id',
            field=models.CharField(default=members.models.card_generator, max_length=6, unique=True),
        ),
    ]
