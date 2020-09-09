from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class MainView(TemplateView):
    template_name = 'ru/main.html'

    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context["events"] = Event.objects.all()[:3]
    #     context["products"] = Product.objects.all()[:4]
    #     context["categories"] = Category.objects.all()
    #     context["projects"] = Project.objects.all()[:5]
    #     context["brands"] = Brand.objects.all()[:4]
    #     context['random_case'] = Project.objects.order_by('?').first()
    #     return context
