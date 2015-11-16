# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rating', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='value',
            field=models.CharField(max_length=2, choices=[(b's1', 1), (b's2', 2), (b's3', 3), (b's4', 4), (b's5', 5)]),
        ),
    ]
