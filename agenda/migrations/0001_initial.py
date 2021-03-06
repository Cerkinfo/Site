# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-11 11:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('displayed', models.BooleanField(default=False)),
                ('pict', models.ImageField(blank=True, upload_to='event')),
                ('title', models.CharField(default='', max_length=300)),
                ('desc', models.TextField()),
            ],
        ),
    ]
