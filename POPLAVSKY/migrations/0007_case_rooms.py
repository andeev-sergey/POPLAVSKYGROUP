# Generated by Django 3.0.8 on 2020-09-09 12:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('POPLAVSKY', '0006_auto_20200909_1223'),
    ]

    operations = [
        migrations.AddField(
            model_name='case',
            name='rooms',
            field=models.ManyToManyField(to='POPLAVSKY.Room', verbose_name='Комнты'),
        ),
    ]
