# Generated by Django 2.1.7 on 2019-06-22 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0007_auto_20190622_1718'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='Ing',
            field=models.FloatField(blank=True, default=0.0),
        ),
        migrations.AddField(
            model_name='user',
            name='lat',
            field=models.FloatField(blank=True, default=0.0),
        ),
    ]
