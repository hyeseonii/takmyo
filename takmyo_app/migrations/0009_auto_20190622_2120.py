# Generated by Django 2.1.7 on 2019-06-22 21:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('takmyo_app', '0008_auto_20190622_1913'),
    ]

    operations = [
        migrations.CreateModel(
            name='Catsitter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.FloatField(blank=True, default=0.0)),
                ('have_pet', models.BooleanField(default=False)),
                ('have_pet_experience', models.BooleanField(default=False)),
                ('available_pill', models.BooleanField(default=False)),
                ('available_visit', models.BooleanField(default=False)),
                ('available_consignment', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='notification',
            name='category',
            field=models.CharField(choices=[('review', 'Review'), ('form', 'Form')], max_length=30, null=True),
        ),
    ]