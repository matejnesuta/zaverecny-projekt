# Generated by Django 3.1.1 on 2021-01-08 09:21

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0041_auto_20210107_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2021, 1, 8))], verbose_name='Deadline'),
        ),
    ]