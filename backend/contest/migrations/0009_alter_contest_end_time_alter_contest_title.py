# Generated by Django 5.0.1 on 2024-03-01 05:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contest', '0008_alter_contest_end_time_alter_contest_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contest',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2024, 3, 2, 5, 10, 7, 441351, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='contest',
            name='title',
            field=models.CharField(default='2024-03-01', max_length=15),
        ),
    ]