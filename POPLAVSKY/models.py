from django.db import models
import datetime


def year_choices():
    return ((r, r) for r in range(1984, datetime.date.today().year + 1))


def current_year():
    return datetime.date.today().year


class BaseClass(models.Model):

    def image_tag(self):
        return u'<img src="%s">' % self.image.url

    display_on_site = models.BooleanField('Отображать на сайте', default=True)

    class Meta:
        abstract = True


class SiteConfig(models.Model):
    phone = models.CharField('Телефон для заказчиков', max_length=16)
    phone_office = models.CharField('телефон офиса', max_length=16)
    mail = models.CharField('почта', max_length=50)
    vk_link = models.CharField('Ссылка вконтакте', max_length=50)
    instagram_link = models.CharField('Ссылка Instagram', max_length=50)
    telegram_link = models.CharField('Ссылка Telegram', max_length=50)
    houzz_link = models.CharField('Ссылка Houzz', max_length=50)
    meta_words = models.TextField('Ключевые слова в формате: "some, key, words"', blank=True)

    def __str__(self):
        return "Настройки сайта"

    class Meta:
        verbose_name = 'Настройки сайта'
        verbose_name_plural = 'Настройки сайта'

class CaseCategory(models.Model):
    name_ru = models.CharField('Название категрии', max_length=30)
    name_eng = models.CharField('Название категрии на английском', max_length=30)

    def __str__(self):
        return self.name_ru

    class Meta:
        verbose_name = 'Категория портфолио'
        verbose_name_plural = 'Категории портфолио'


class Area(models.Model):
    name_ru = models.CharField('Название зоны', max_length=30)
    name_eng = models.CharField('Название зоны на английском', max_length=30)
    area_value = models.CharField('Значение в м2', max_length=30)

    def __str__(self):
        return self.area_value


class Room(models.Model):
    name_ru = models.CharField('Название комнаты', max_length=30)
    name_eng = models.CharField('Название комнаты на английском', max_length=30)
    image = models.ImageField('Изображение', upload_to='Rooms/', blank=True)
    room_descrition_ru = models.TextField('Описание комнаты', max_length=500)
    room_descrition_eng = models.TextField('Описание комнаты на английском', max_length=500)

    def __str__(self):
        return self.name_ru + ' ||| ' + self.room_descrition_ru


class Case(BaseClass):
    category = models.ForeignKey(CaseCategory, verbose_name='Категория', on_delete=models.CASCADE)
    image = models.ImageField("Превью", upload_to='Cases/', blank=True)
    title_ru = models.CharField('Название проекта', max_length=30)
    title_eng = models.CharField('Название проекта на английском', max_length=30)
    short_descrition_ru = models.TextField('Краткое писание проекта', max_length=300)
    short_descrition_eng = models.TextField('Краткое описание проекта на английском', max_length=300)
    descrition_ru = models.TextField('Описание проекта', max_length=500)
    descrition_eng = models.TextField('Описание проекта на английском', max_length=500)
    price_rub = models.IntegerField('Цена в рублях', blank=False)
    price_usd = models.IntegerField('Цена в $', blank=False)
    style_ru = models.CharField('Стиль проекта', max_length=30)
    style_eng = models.CharField('Стиль проекта на английском', max_length=30)
    year = models.IntegerField('Год проекта', choices=year_choices(), default=current_year())
    areas = models.ManyToManyField(Area, verbose_name='Площади', blank=False)
    rooms = models.ManyToManyField(Room, verbose_name='Комнты', blank=False)
    project_plan = models.ImageField("План проекта", upload_to='Cases/', blank=True)
    location_ru = models.CharField('Лоцакия', max_length=30)
    location_eng = models.CharField('Лоцакия на английском', max_length=30)

    def __str__(self):
        return self.title_ru

    class Meta:
        verbose_name = "Проект"
        verbose_name_plural = "Проекты"


class Review(BaseClass):
    name = models.CharField('Имя', blank=False, max_length=30)
    title_ru = models.CharField('Должность', max_length=30)
    title_eng = models.CharField('Должность на английском', max_length=30)
    image = models.ImageField("Фото клиента", upload_to='Clients/', blank=True)
    project = models.ForeignKey(Case, verbose_name='Проект', blank=True, null=True, on_delete=models.CASCADE)
    review_title_ru = models.CharField('Заголовок отзыва', blank=False, max_length=30)
    review_body_ru = models.TextField('Отзыв', blank=False)
    review_title_eng = models.CharField('Заголовок отзыва на англипйском', blank=False, max_length=30)
    review_body_eng = models.TextField('Отзыв на английском', blank=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'


class Worker(BaseClass):
    name_ru = models.CharField('Имя', max_length=30)
    name_eng = models.CharField('Имя на английском', max_length=30)
    title_ru = models.CharField('Должность', max_length=30)
    title_eng = models.CharField('Должность на английском', max_length=30)
    image = models.ImageField("Фото", upload_to='Team/', blank=True)

    def __str__(self):
        return self.name_ru

    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Наша комнада'


class Partners(BaseClass):
    name_ru = models.CharField('Название', max_length=30)
    name_eng = models.CharField('Название на английском', max_length=30)
    image = models.ImageField("Лого партнёра", upload_to='Partners/', blank=True)

    def __str__(self):
        return self.name_ru

    class Meta:
        verbose_name = 'Партнёр'
        verbose_name_plural = 'Партнёры'


class Request(models.Model):
    name = models.CharField('Имя', max_length=30)
    email = models.CharField('Почта', max_length=30)
    massage = models.TextField("Сообщение   ", blank=True)
    phone = models.IntegerField('Телефон', blank=True)
    question_or_request = models.BooleanField('Заявка', default=False)
    created_at = models.DateTimeField('Отправлено', auto_now_add=True)
    updated_at = models.DateTimeField('Измененно', auto_now=True)
    status = models.BooleanField('Обработан', default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
