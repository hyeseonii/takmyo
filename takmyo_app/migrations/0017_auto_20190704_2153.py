# Generated by Django 2.1.7 on 2019-07-04 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0016_auto_20190630_2023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cateetocatsitterform',
            name='place',
            field=models.CharField(choices=[('consignment', 'Consignment'), ('visit', 'Visit')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='cateetocatsitterform',
            name='state',
            field=models.CharField(choices=[('progress', 'Progress'), ('recognized', 'Recognized'), ('unrecognized', 'Unrecognized')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_day',
            field=models.CharField(choices=[('weekday', 'Weekday'), ('both', 'Both'), ('weekend', 'Weekend')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_place',
            field=models.CharField(choices=[('both', 'Both'), ('consignment', 'Consignment'), ('visit', 'Visit')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_weekday_time',
            field=models.CharField(choices=[('am', 'Am'), ('both', 'Both'), ('pm', 'Pm')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_weekend_time',
            field=models.CharField(choices=[('am', 'Am'), ('both', 'Both'), ('pm', 'Pm')], default='', max_length=10),
        ),
    ]