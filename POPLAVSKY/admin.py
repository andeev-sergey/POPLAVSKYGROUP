from django.contrib import admin, auth
from django.contrib.admin import AdminSite
from django.utils.html import format_html
from POPLAVSKY.models import *


# Register your models here.
class MyAdminSite(AdminSite):

    def get_app_list(self, request):
        app_dict = self._build_app_dict(request)

        app_list = sorted(app_dict.values(), key=lambda x: x['name'].lower())

        return app_list


admin.site = MyAdminSite()

admin.site.index_title = 'Администрирование'
admin.site.site_title = 'POPLAVSKY'
admin.site.site_header = 'POPLAVSKY'


class ReviewAdmin(admin.ModelAdmin):

    def image_tag(self, obj):
        return format_html('<img height="40px"  src="{}" />'.format(obj.image.url))

    image_tag.short_description = 'Изображение'
    list_display = ('image_tag', 'name', 'project', 'review_body_ru', 'display_on_site')
    list_filter = ('project', 'display_on_site',)
    list_editable = ('name', 'project', 'review_body_ru', 'display_on_site')


class CaseAdmin(admin.ModelAdmin):
    def image_tag(self, obj):
        return format_html('<img height="80px"  src="{}" />'.format(obj.image.url))

    image_tag.short_description = 'Изображение'

    list_display = ('title_ru', 'category', 'style_ru', 'year', 'location_ru', 'price_rub', 'price_usd',
                    'display_on_site')
    list_editable = ('display_on_site', 'category', 'year', 'price_rub', 'price_usd')
    filter_horizontal = ('areas', 'rooms',)
    list_filter = ('display_on_site', 'category',)


class WorkerAdmin(admin.ModelAdmin):
    def image_tag(self, obj):
        return format_html('<img height="80px"  src="{}" />'.format(obj.image.url))

    image_tag.short_description = 'Изображение'
    list_display = ('image_tag', 'name_ru', 'name_eng', 'title_ru', 'title_eng', 'display_on_site')
    list_editable = ('name_ru', 'name_eng', 'title_ru', 'title_eng', 'display_on_site')
    list_filter = ('display_on_site',)


class PartnersAdmin(admin.ModelAdmin):
    def image_tag(self, obj):
        return format_html(
            '<img height="50px" style="background: #222; padding: 20px;" src="{}" />'.format(obj.image.url))

    image_tag.short_description = 'Изображение'

    list_display = ('image_tag', 'name_ru', 'name_eng', 'display_on_site')
    list_editable = ('name_ru', 'name_eng', 'display_on_site')
    list_filter = ('display_on_site',)


class RequestAdmin(admin.ModelAdmin):
    def phone_link(self, obj):
        if obj.phone.isdigit():
            return format_html('<a href="tel:{}">'.format(obj.phone) + '{}</a>'.format(obj.phone))
        else:
            return format_html(obj.phone)

    def email_link(self, obj):
        return format_html('<a href="mailto:{}">'.format(obj.email) + '{}</a>'.format(obj.email))

    def created(self, obj):
        return obj.created_at.strftime('%d.%m.%y --- %H.%M.%S')

    email_link.short_description = 'Email'
    phone_link.short_description = 'Телефон'
    list_display = ('name', 'phone_link', 'email_link', 'created_at', 'from_page', 'status')
    list_filter = ('status', 'from_page')
    readonly_fields = ['name', 'phone_link', 'email_link', 'created_at', 'massage', 'from_page', ]


admin.site.register(Case, CaseAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Worker, WorkerAdmin)
admin.site.register(Request, RequestAdmin)
admin.site.register(Partners, PartnersAdmin)
admin.site.register(SiteConfig)
admin.site.register(CaseCategory)
admin.site.register(Area)
admin.site.register(Room)
