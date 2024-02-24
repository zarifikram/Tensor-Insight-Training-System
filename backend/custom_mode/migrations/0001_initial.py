# Generated by Django 5.0.1 on 2024-01-27 20:29

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('problem', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='InitiatorChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('randint', models.BooleanField(default=True)),
                ('zeros', models.BooleanField(default=True)),
                ('ones', models.BooleanField(default=True)),
                ('arange', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='ManipulatorChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('argwhere', models.BooleanField(default=True)),
                ('tensor_split', models.BooleanField(default=True)),
                ('gather', models.BooleanField(default=True)),
                ('masked_select', models.BooleanField(default=True)),
                ('movedim', models.BooleanField(default=True)),
                ('splicing', models.BooleanField(default=True)),
                ('t', models.BooleanField(default=True)),
                ('take', models.BooleanField(default=True)),
                ('tile', models.BooleanField(default=True)),
                ('unsqueeze', models.BooleanField(default=True)),
                ('negative', models.BooleanField(default=True)),
                ('positive', models.BooleanField(default=True)),
                ('where', models.BooleanField(default=True)),
                ('remainder', models.BooleanField(default=True)),
                ('clip', models.BooleanField(default=True)),
                ('argmax', models.BooleanField(default=True)),
                ('argmin', models.BooleanField(default=True)),
                ('sum', models.BooleanField(default=True)),
                ('unique', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomMode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('depth', models.IntegerField(default=2)),
                ('is_finished', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('current_problem', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='problem.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('initiator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='custom_mode.initiatorchoice')),
                ('manipulator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='custom_mode.manipulatorchoice')),
            ],
        ),
        migrations.CreateModel(
            name='CustomModeSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('custom_mode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='custom_mode.custommode')),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem.submission')),
            ],
        ),
    ]
