# Generated by Django 2.1.7 on 2019-06-15 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0004_notification'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='notification',
            name='category',
            field=models.CharField(choices=[('review', 'Review'), ('form', 'Form')], max_length=30, null=True),
        ),
    ]
