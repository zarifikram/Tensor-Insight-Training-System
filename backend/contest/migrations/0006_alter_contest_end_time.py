# Generated by Django 5.0.1 on 2024-02-19 20:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contest', '0005_alter_contest_end_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contest',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 20, 20, 3, 27, 9690, tzinfo=datetime.timezone.utc)),
        ),
    ]
