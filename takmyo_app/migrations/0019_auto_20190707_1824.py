# Generated by Django 2.1.7 on 2019-07-07 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0018_auto_20190704_2330'),
    ]

    operations = [
        migrations.AddField(
            model_name='cat',
            name='feature',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cat',
            name='hospital',
            field=models.CharField(blank=True, default='unknown', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='cat',
            name='warning',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateetocatsitterform',
            name='place',
            field=models.CharField(choices=[('visit', 'Visit'), ('consignment', 'Consignment')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='cateetocatsitterform',
            name='state',
            field=models.CharField(choices=[('recognized', 'Recognized'), ('progress', 'Progress'), ('unrecognized', 'Unrecognized')], default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_day',
            field=models.CharField(choices=[('weekend', 'Weekend'), ('weekday', 'Weekday'), ('both', 'Both')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_place',
            field=models.CharField(choices=[('visit', 'Visit'), ('both', 'Both'), ('consignment', 'Consignment')], default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_weekday_time',
            field=models.CharField(choices=[('am', 'Am'), ('pm', 'Pm'), ('both', 'Both')], default='', max_length=10),
        ),
        migrations.AlterField(
            model_name='catsitter',
            name='available_weekend_time',
            field=models.CharField(choices=[('am', 'Am'), ('pm', 'Pm'), ('both', 'Both')], default='', max_length=10),
        ),
    ]
