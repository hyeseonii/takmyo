# Generated by Django 2.1.7 on 2019-06-12 19:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0002_user_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, default='unknown.png', null=True, upload_to='profileImage/'),
        ),
    ]
