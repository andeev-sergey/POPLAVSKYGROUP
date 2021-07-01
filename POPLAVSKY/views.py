from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.shortcuts import render
import json
import base64
# Create your views here.
from django.views.generic import TemplateView, ListView
from django.views.generic.detail import DetailView
from POPLAVSKY.models import Case, Worker, Review, Partners, SiteConfig, Request, CaseCategory, Area, Room
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
from django.contrib.auth import logout

def base64_file(data, name=None):
    _format, _img_str = data.split(';base64,')
    _name, ext = _format.split('/')
    if not name:
        name = _name.split(":")[-1]
    return ContentFile(base64.b64decode(_img_str), name='{}.{}'.format(name, ext))



class MainView(TemplateView):
    template_name = 'ru/main.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        return context


class MainViewEng(TemplateView):
    template_name = 'eng/main.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        return context


class Portfolio(ListView):
    template_name = 'ru/portfolio.html'
    model = Case
    context_object_name = 'cases'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'Портфолио'
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page_en"] = 'Portfolio'
        return context


class PortfolioEng(ListView):
    template_name = 'eng/portfolio.html'
    model = Case
    context_object_name = 'cases'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'Portfolio'
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page_en"] = 'Portfolio'
        return context


class CaseEng(DetailView):
    model = Case
    context_object_name = 'case'
    template_name = 'eng/case.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        return context


class CaseDetail(DetailView):
    model = Case
    context_object_name = 'case'
    template_name = 'ru/case.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        return context


class Prices(ListView):
    model = Worker
    context_object_name = 'case'
    template_name = 'ru/prices.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'Цены и услуги'
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page_en"] = 'Prices & services'
        return context


class PricesEng(ListView):
    model = Worker
    context_object_name = 'case'
    template_name = 'eng/prices.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = 'Цены и услуги'
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page_en"] = 'Prices & services'
        return context


class AboutUs(ListView):
    model = Worker
    context_object_name = 'workers'
    template_name = 'ru/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['reviews'] = Review.objects.all()
        context['partners'] = Partners.objects.all()
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page"] = 'О нас'
        context["page_en"] = 'About us'
        return context


class AboutUsEng(ListView):
    model = Worker
    context_object_name = 'workers'
    template_name = 'eng/about.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['reviews'] = Review.objects.all()
        context['partners'] = Partners.objects.all()
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page"] = 'О нас'
        context["page_en"] = 'About us'
        return context


class Contacts(TemplateView):
    template_name = 'ru/contacts.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page"] = 'Контакты'
        context["page_en"] = 'Contacts'
        return context


class EngContacts(TemplateView):
    template_name = 'eng/contacts.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["settings"] = SiteConfig.objects.get(is_active=True)
        context["page"] = 'Контакты'
        context["page_en"] = 'Contacts'
        return context


def request_call(request):
    name = request.POST.get('name')
    email = request.POST.get('email')
    phone = request.POST.get('phone')
    massage = request.POST.get('msg')
    from_page = request.POST.get('from_page')
    if phone:
        Request.objects.create(
            name=name,
            email=email,
            phone=phone,
            massage=massage,
            from_page=from_page,
        )
        return HttpResponse(True, content_type="text/html")

    elif name:
        Request.objects.create(
            name=name,
            email=email,
            massage=massage,
            from_page=from_page,
        )
        return HttpResponse(True, content_type="text/html")
    else:
        HttpResponse('no', content_type='text/html')


def page_not_found(request, exception):
    context = {
        'settings': SiteConfig.objects.get(is_active=True)
    }
    return render(request, '404.html', context, locals())


def page_not_found_web(request):
    context = {
        'settings': SiteConfig.objects.get(is_active=True)
    }
    return render(request, "404.html", context)


class managerPanel(ListView):
    template_name = 'manager/main.html'
    model = Case
    context_object_name = 'cases'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = CaseCategory.objects.all()
        return context

class CaseManagerDetail(DetailView):
    model = Case
    context_object_name = 'case'
    template_name = 'manager/edit.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #context["settings"] = SiteConfig.objects.get(is_active=True)
        context['loop_times'] = range(2013, 2030)
        context["categories"] = CaseCategory.objects.all()
        context["areas"] = Area.objects.filter(case__pk = self.kwargs.get('pk'))
        context["rooms"] = Room.objects.filter(case__pk = self.kwargs.get('pk')).order_by('sort')
        return context

class Requests(TemplateView):
    template_name = 'manager/requests.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["requests"] = Request.objects.order_by('-created_at')
        context["new"] = Request.objects.filter(status = False).count()
        context["all"] = Request.objects.count()
        return context

class AddProject(TemplateView):
    template_name = "manager/add.html"
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["categories"] = CaseCategory.objects.all()
        context['loop_times'] = range(2013, 2030)
        #context["requests"] = Request.objects.order_by('-created_at')
        #context["new"] = Request.objects.filter(status = False).count()
        return context

def add_project(request):
    obj = request.POST.get('data')
    print('success')
    if obj:
        data = json.loads(obj)
        areas = []
        rooms = []

        for area in data['areas']:
            a = Area.objects.create(
                name_ru=area['ruTitle'],
                name_eng=area['engTitle'],
                area_value=area['value'],
                sort=area['sort']
            )
            areas.append(a.id)

        for room in data['rooms']:
            r = Room.objects.create(
                name_ru = room['ruTitle'],
                name_eng = room['engTitle'],
                room_descrition_ru = room['ruText'],
                room_descrition_eng = room['engText'],
                image = base64_file(room['img']),
                sort = room['sort']
            )
            rooms.append(r.id)

        c = Case.objects.create(
                category = get_object_or_404(CaseCategory, name_ru=data['category']) ,
                image = base64_file(data['preview']),
                title_ru = data['title']['ru'],
                title_eng = data['title']['eng'],
                short_descrition_ru = data['short_description']['ru'],
                short_descrition_eng = data['short_description']['eng'],
                descrition_ru = data['description']['ru'],
                descrition_eng = data['description']['eng'],
                price_rub = data['price']['ru'],
                price_usd = data['price']['eng'],
                style_ru = data['style']['ru'],
                style_eng = data['style']['eng'],
                location_ru = data['location']['ru'],
                location_eng = data['location']['eng'],
                seo_dictinary = data['seo'],
                year = data['year'],
                project_plan = base64_file(data['plan']), # план проекта
                sort =1
        )
        for room in rooms:
            c.rooms.add(Room.objects.get(id=room))
        for area in areas:
            c.areas.add(Area.objects.get(id=area))
        print('e')
        return HttpResponse(True, content_type="text/html")
    else:
        return HttpResponse(False, content_type="text/html")

def edit_project(request):
    obj = request.POST.get('data')
    #print('success')
    if obj:
        data = json.loads(obj)
        case = get_object_or_404(Case, pk = data['projectPk'])
        # Поля модели
        for input in data['changes']:
            if input['type'] == "preview":
                case.image.delete(save=True)
                case.image = base64_file(input['value'])

            elif input['type'] == "plan":
                case.project_plan.delete(save=True)
                case.project_plan = base64_file(input['value'])
            elif input['type'] == "category":
                case.category = get_object_or_404(CaseCategory, name_ru=input['value'])
            else:
                setattr(case, input['type'], input['value'])

            case.save()
        # Площади
        for area in data['areas']['changes']:
            area_data = area['value']
            if area['type'] == "createArea":
                print(area_data['name_ru'])
                a = Area.objects.create(
                    name_ru = area_data['name_ru'],
                    name_eng = area_data['name_eng'],
                    area_value = area_data['area_value'],
                    sort = 1
                )
                case.areas.add(a)
            elif area['type'] == "changeArea":
                a =  get_object_or_404(Area, pk = area_data['pk'])
                if a:
                    a.area_value = area_data['area_value']
                    a.name_eng = area_data['name_eng']
                    a.name_ru = area_data['name_ru']
                    a.save()
            elif area['type'] == "removeArea":
                a =  get_object_or_404(Area, pk = area_data['pk'])
                a.delete()

        for a in data['areas']['sorting']:
            if a['pk'] != 'new':
                area = get_object_or_404(Area, pk = a['pk'])
                area.sort = a['sort']
                area.save()
            #print(a['pk'], a['sort'])
        # Комнаты
        for room in data['rooms']['changes']:
            room_data = room['value']
            if room['type'] == "createRoom":
                a = Room.objects.create(
                    name_ru = room_data['title'],
                    name_eng = room_data['engTitle'],
                    image = base64_file(room_data['img']),
                    room_descrition_ru = room_data['ruText'],
                    room_descrition_eng = room_data['engText'],
                    sort = 1
                )
                case.rooms.add(a)
            elif room['type'] == "removeRoom":
                r =  get_object_or_404(Room, pk = room_data['pk'])
                r.delete()
            elif room['type'] == 'changeRoom':
                r =  get_object_or_404(Room, pk = room_data['pk'])
                if r:
                    if "media/Rooms" not in room_data['img']:
                        r.image.delete(save=True)
                        r.image = base64_file(room_data['img'])
                    r.name_ru = room_data['title']
                    r.name_eng = room_data['engTitle']
                    r.room_descrition_ru = room_data['ruText']
                    r.room_descrition_eng = room_data['engText']
                    r.save()

        for r in data['rooms']['sorting']:
            if r['pk'] != 'new':
                room = get_object_or_404(Room, pk = r['pk'])
                room.sort = r['sort']
                room.save()

    return HttpResponse(True, content_type="text/html")

def edit_request(request):
    obj = request.POST.get('data')
    #print('success')
    if obj:
        data = json.loads(obj)
        r = get_object_or_404(Request, pk = data['pk'])
        print(r.status)
        r.status = data['value']
        r.save()
        return HttpResponse(True, content_type="text/html")

class Settings(TemplateView):
    template_name = 'manager/settings.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        #context["settings"] = Request.objects.order_by('-created_at')
        context["s"] = SiteConfig.objects.get(is_active = True)
        #context["all"] = Request.objects.count()
        return context

def edit_settings(request):
    data = json.loads(request.POST.get('data'))
    fields = data['fields']
    config = SiteConfig.objects.get(is_active = True)
    for f in fields:
        setattr(config, f['field'], f['value'])
    config.save()
    return HttpResponse(True, content_type="text/html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('./')