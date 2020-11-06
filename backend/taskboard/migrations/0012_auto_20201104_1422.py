# Generated by Django 3.1.1 on 2020-11-04 13:22

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0011_auto_20201006_1835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2020, 11, 4))], verbose_name='Deadline'),
        ),
    ]