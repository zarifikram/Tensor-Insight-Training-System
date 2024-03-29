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
            name='TimeMode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.CharField(choices=[('600', '600'), ('1800', '1800'), ('3600', '3600')], max_length=10)),
                ('current_problem_num', models.IntegerField(default=1)),
                ('is_finished', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('current_problem', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='problem.problem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TimeModeSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_number', models.IntegerField(default=1)),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='problem.submission')),
                ('time_mode', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='time_mode.timemode')),
            ],
        ),
    ]
