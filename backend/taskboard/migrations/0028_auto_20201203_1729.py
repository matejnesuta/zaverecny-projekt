# Generated by Django 3.1.1 on 2020-12-03 16:29

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0027_auto_20201201_2036'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2020, 12, 3))], verbose_name='Deadline'),
        ),
    ]
