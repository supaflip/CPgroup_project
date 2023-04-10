# Generated by Django 4.1.7 on 2023-03-24 00:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='day',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workouts', to='workout_app.day'),
        ),
        migrations.AlterField(
            model_name='workout',
            name='week',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workouts', to='workout_app.week'),
        ),
    ]