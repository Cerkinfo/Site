# -*- coding: utf-8 -*-
# Generated by Django 1.9.11 on 2016-11-28 15:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('members', '0007_auto_20161124_1449'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='card_id',
        ),
    ]
