# Generated by Django 3.1.1 on 2020-11-14 23:57

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0016_auto_20201114_2021'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2020, 11, 15))], verbose_name='Deadline'),
        ),
    ]
