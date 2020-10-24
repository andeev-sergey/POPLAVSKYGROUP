from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView, ListView
from django.views.generic.detail import DetailView
from POPLAVSKY.models import Case, Worker, Review, Partners, SiteConfig, Request


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


class Case(DetailView):
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


