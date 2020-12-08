# Generated by Django 3.1.1 on 2020-12-07 16:28

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskboard', '0029_auto_20201206_1658'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='deadline',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(datetime.date(2020, 12, 7))], verbose_name='Deadline'),
        ),
    ]
