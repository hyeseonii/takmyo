# Generated by Django 2.1.7 on 2019-06-19 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0005_auto_20190615_2044'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='post_code',
            field=models.CharField(default='unknown', max_length=255),
        ),
    ]
