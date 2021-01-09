# Generated by Django 3.1.1 on 2020-12-27 15:33

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0037_auto_20201226_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2020, 12, 27))], verbose_name='Deadline'),
        ),
    ]
