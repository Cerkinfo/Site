# -*- coding: utf-8 -*-
# Generated by Django 1.9.11 on 2016-11-28 18:20
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('coma', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MolliePayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('confirmed', models.BooleanField(default=False)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=5)),
                ('mollie_id', models.CharField(max_length=255, null=True)),
                ('transaction', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='coma.Transaction')),
            ],
        ),
    ]