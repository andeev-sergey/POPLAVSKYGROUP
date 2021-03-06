# Generated by Django 3.0.8 on 2020-09-09 11:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('POPLAVSKY', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Имя')),
                ('email', models.CharField(max_length=30, verbose_name='Почта')),
                ('massage', models.TextField(blank=True, verbose_name='Лого партнёра')),
                ('phone', models.IntegerField(blank=True, verbose_name='Телефон')),
                ('question_or_request', models.BooleanField(default=False, verbose_name='Заявка')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Отправлено')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Измененно')),
                ('status', models.BooleanField(default=False, verbose_name='Статус обработки')),
            ],
            options={
                'verbose_name': 'Заявка',
                'verbose_name_plural': 'Заявки',
            },
        ),
        migrations.RenameField(
            model_name='case',
            old_name='preview_image',
            new_name='image',
        ),
    ]
