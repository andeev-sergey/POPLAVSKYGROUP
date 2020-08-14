from django.db import models
import datetime


def year_choices():
    return [(r, r) for r in range(1984, datetime.date.today().year + 1)]


def current_year():
    return datetime.date.today().year


# Create your models here.
class SiteConfig(models.Model):
    phone = models.CharField('Телефон для заказчиков', max_length=12)
    phone_office = models.CharField('телефон офиса', max_length=12)
    mail = models.CharField('почта', max_length=50)
    vk_link = models.CharField('Ссылка вконтакте', max_length=50)
    instagram_link = models.CharField('Ссылка Instagram', max_length=50)
    telegram_link = models.CharField('Ссылка Telegram', max_length=50)
    houzz_link = models.CharField('Ссылка Houzz', max_length=50)

    def __str__(self):
        return "Настройки сайта"


class CaseCategory(models.Model):
    name_ru = models.CharField('Название категрии', max_length=30)
    name_eng = models.CharField('Название категрии на английском', max_length=30)

    def __str__(self):
        return self.name_ru

    class Meta:
        verbose_name = 'Категория элемента портфолио'
        verbose_name_plural = 'Категории элементов портфолио'


class Area(models.Model):
    name_ru = models.CharField('Название зоны', max_length=30)
    name_eng = models.CharField('Название зоны на английском', max_length=30)
    area_value = models.CharField('Значение в м2')

    def __str__(self):
        return self.area_value


class Room(models.Model):
    name_ru = models.CharField('Название комнаты', max_length=30)
    name_eng = models.CharField('Название комнаты на английском', max_length=30)
    image = models.ImageField('Изображение', upload_to='Rooms/', blank=True)
    room_descrition_ru = models.TextField('Описание комнаты', max_length=500)
    room_descrition_eng = models.TextField('Описание комнаты на английском', max_length=500)


class Case(models.Model):
    category = models.ForeignKey('Категория', CaseCategory, on_delete=models.CASCADE)
    preview_image = models.ImageField("Превью", upload_to='Cases/', blank=True)
    name_ru = models.CharField('Название проекта', max_length=30)
    name_eng = models.CharField('Название проекта на английском', max_length=30)
    short_descrition_ru = models.CharField('Краткое писание проекта', max_length=30)
    short_descrition_eng = models.CharField('Краткое описание проекта на английском', max_length=30)
    descrition_ru = models.TextField('Описание проекта', max_length=500)
    descrition_eng = models.TextField('Описание проекта на английском', max_length=500)
    price_rub = models.IntegerField('Цена в рублях', blank=False)
    price_usd = models.IntegerField('Цена в рублях', blank=False)
    Style_ru = models.CharField('Стиль проекта', max_length=30)
    style_eng = models.CharField('Стиль проекта на английском', max_length=30)
    year = models.IntegerField('Год проекта', choices=year_choices, default=current_year())
    areas = models.ManyToManyField(Area, verbose_name='Площади', blank=False)
    project_plan = models.ImageField("План проекта", upload_to='Cases/', blank=True)

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


class Review(models.Model):
    name = models.CharField('Имя', blank=False, max_length=30)
    title_ru = models.CharField('Должность', max_length=30)
    title_eng = models.CharField('Должность на английском', max_length=30)
    image = models.ImageField("Фото клиента", upload_to='Clients/', blank=True)
    project = models.ForeignKey('Проект', Case, blank=True)
    review_title_ru = models.CharField('Заголовок отзыва', blank=False, max_length=30)
    review_body_ru = models.TextField('Отзыв', blank=False)
    review_title_eng = models.CharField('Заголовок отзыва на англипйском', blank=False, max_length=30)
    review_body_eng = models.TextField('Отзыв на английском', blank=False)

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'
