from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.views.generic import DetailView ,UpdateView
from members.forms import MemberForm, ComiteItemFormset, FolkloItemFormset, \
    YearForm, ComiteListFormset
from members.models import Member, ComiteMembership, AcademicYear


class MemberDetailView(DetailView):
    model = Member
    template_name = 'member_detail.html'
    context_object_name = 'member'
    slug_field = 'id'


class CurrentMemberDetailView(MemberDetailView):
    def get_object(self):
        return self.request.user.member


class MemberEditView(UpdateView):
    form_class = MemberForm
    template_name = 'member_form.html'
    get_success_url = lambda self: reverse('profile')

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        comite_poste_form = ComiteItemFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(poste__is_bapteme=False),
            prefix='comite')
        folklo_poste_form = FolkloItemFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(poste__is_bapteme=True),
            prefix='folklo')
        return self.render_to_response(
            self.get_context_data(
                form=form,
                comite_form=comite_poste_form,
                folklo_form=folklo_poste_form))

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        comite_poste_form = ComiteItemFormset(request.POST,
                                              instance=self.object,
                                              prefix='comite')
        folklo_poste_form = FolkloItemFormset(request.POST,
                                              instance=self.object,
                                              prefix='folklo')
        if (form.is_valid() and
            comite_poste_form.is_valid() and
            folklo_poste_form.is_valid()):
            return self.form_valid(form, comite_poste_form, folklo_poste_form)
        return self.form_invalid(form, comite_poste_form, folklo_poste_form)

    def form_valid(self, form, comite_poste_form, folklo_poste_form):
        self.object = form.save()
        comite_poste_form.instance = self.object
        comite_poste_form.save()
        folklo_poste_form.instance = self.object
        folklo_poste_form.save()
        return HttpResponseRedirect(self.get_success_url())

    def form_invalid(self, form, comite_poste_form, folklo_poste_form):
        return self.render_to_response(
            self.get_context_data(
                form=form,
                comite_poste_form=comite_poste_form,
                folklo_poste_form=folklo_poste_form))

    def get_object(self, queryset=None):
        return self.request.user.member


class YearDetailView(DetailView):
    model = AcademicYear
    template_name = 'year_detail.html'
    slug_field = 'slug'



class YearEditView(UpdateView):
    model = AcademicYear
    slug_field = 'slug'
    slug_url_kwarg = 'slug'
    form_class = YearForm
    template_name = 'year_form.html'

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        comite_cercle_form = ComiteListFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(
                poste__is_bapteme=False).order_by('-poste__weight'),
            prefix='cercle')
        comite_bapteme_form = ComiteListFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(
                poste__is_bapteme=True).exclude(
                poste__slug='bleu').exclude(
                poste__slug='TC').order_by('-poste__weight'),
            prefix='bapteme')
        bapt_cercle_form = ComiteListFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(
                poste__is_bapteme=True).filter(
                poste__slug='TC'),
            prefix='tc')
        bleu_form = ComiteListFormset(
            instance=self.object,
            queryset=ComiteMembership.objects.filter(
                poste__is_bapteme=True).filter(
                poste__slug='bleu'),
            prefix='bleu')
        return self.render_to_response(
            self.get_context_data(form=form,
                                  comite_cercle_form=comite_cercle_form,
                                  comite_bapteme_form=comite_bapteme_form,
                                  bapt_cercle_form=bapt_cercle_form,
                                  bleu_form=bleu_form))

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        comite_cercle_form = ComiteListFormset(request.POST,
                                               instance=self.object,
                                               prefix='cercle')
        comite_bapteme_form = ComiteListFormset(request.POST,
                                                instance=self.object,
                                                prefix='bapteme')
        cercle_bapteme_form = ComiteListFormset(request.POST,
                                                instance=self.object,
                                                prefix='tc')
        bleu_form = ComiteListFormset(request.POST,
                                      instance=self.object,
                                      prefix='bleu')
        if (form.is_valid() and
                comite_cercle_form.is_valid() and
                comite_bapteme_form.is_valid() and
                cercle_bapteme_form.is_valid() and
                bleu_form.is_valid()):
            return self.form_valid(form,
                                   comite_cercle_form,
                                   comite_bapteme_form,
                                   cercle_bapteme_form,
                                   bleu_form)
        return self.form_invalid(form,
                                 comite_cercle_form,
                                 comite_bapteme_form,
                                 cercle_bapteme_form,
                                 bleu_form)

    def form_valid(self, form,
                   comite_cercle_form,
                   comite_bapteme_form,
                   cercle_bapteme_form,
                   bleu_form):
        self.object = form.save()
        comite_cercle_form.instance = self.object
        comite_cercle_form.save()
        comite_bapteme_form.instance = self.object
        comite_bapteme_form.save()
        cercle_bapteme_form.instance = self.object
        cercle_bapteme_form.save()
        bleu_form.instance = self.object
        bleu_form.save()
        return HttpResponseRedirect(
            reverse('year_detail', kwargs={'slug': self.object.slug}))

    def form_invalid(self, form,
                     comite_cercle_form,
                     comite_bapteme_form,
                     cercle_bapteme_form,
                     bleu_form):
        return self.render_to_response(
            self.get_context_data(form=form,
                                  comite_cercle_form=comite_cercle_form,
                                  comite_bapteme_form=comite_bapteme_form,
                                  bapt_cercle_form=cercle_bapteme_form,
                                  bleu_form=bleu_form))
