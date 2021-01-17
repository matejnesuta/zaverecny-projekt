# Generated by Django 3.1.1 on 2021-01-07 11:24

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0040_auto_20210106_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2021, 1, 7))], verbose_name='Deadline'),
        ),
    ]