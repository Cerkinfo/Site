from bootstrap3_datetime.widgets import DateTimePicker
from captcha.fields import ReCaptchaField
from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import BLANK_CHOICE_DASH
from django.forms import inlineformset_factory
from django.utils.translation import ugettext_lazy as _
from fuzzywuzzy import fuzz

from members.models import Member, ComitePoste, ComiteMembership, AcademicYear


class YearForm(forms.ModelForm):
    class Meta:
        model = AcademicYear
        fields = ["active"]


class MemberForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['avatar', 'birthdate']
        widgets = {
            'birthdate': DateTimePicker(options={"format": "DD/MM/YYYY"})
        }


class ComiteMForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(ComiteMForm, self).__init__(*args, **kwargs)
        self.fields['poste'].queryset = ComitePoste.objects.filter(
            is_bapteme=False
        )

    class Meta:
        model = ComiteMembership
        fields = [
            'year',
            'poste'
        ]


class FolkloMForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(FolkloMForm, self).__init__(*args, **kwargs)
        self.fields['poste'].queryset = ComitePoste.objects.filter(
            is_bapteme=True
        )

    class Meta:
        model = ComiteMembership
        fields = [
            'year',
            'poste'
        ]


ComiteListFormset = inlineformset_factory(AcademicYear,
                                          ComiteMembership,
                                          fields=('member', 'poste'),
                                          can_delete=True,
                                          extra=1)

ComiteItemFormset = inlineformset_factory(Member,
                                          ComiteMembership,
                                          form=ComiteMForm,
                                          fields=('year', 'poste'),
                                          can_delete=True,
                                          extra=1)


FolkloItemFormset = inlineformset_factory(Member,
                                          ComiteMembership,
                                          form=FolkloMForm,
                                          fields=('year', 'poste'),
                                          can_delete=True,
                                          extra=1)


class MemberImportForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        super(MemberImportForm, self).__init__(*args, **kwargs)
        member_not_attribued = Member.objects.filter(
            user__isnull=True).distinct()
        members_in, members_out = self.get_relevant(user,
                                                    member_not_attribued)
        members_in, members_out = self.transform_choices(members_in,
                                                         members_out)
        self.fields['c_in'] = forms.ChoiceField(
            label=_("Ancien utilisateur le plus proche"),
            choices=BLANK_CHOICE_DASH + members_in,
            required=False)
        self.fields['c_out'] = forms.ChoiceField(
            label=_("Les utilisateurs disponibles"),
            choices=BLANK_CHOICE_DASH + members_out,
            required=False)

    def get_relevant(self, user, members):
        potential_members = []
        removed_members = []
        for member in members:
            acceptable = False
            surnames = member.surnames()
            i = 0
            while not acceptable and i < len(surnames):
                if fuzz.ratio(surnames[i].value, user.username) > 85:
                    acceptable = True
                i += 1
            if acceptable:
                potential_members.append(member)
            else:
                removed_members.append(member)
        return potential_members, removed_members

    def transform_choices(self, inp, out):
        c_in_l = []
        c_out_l = []
        for i in inp:
            c_in_l.append((i.id, i))
        for i in out:
            c_out_l.append((i.id, i))
        return c_in_l, c_out_l

    class Meta:
        model = User
        fields = ['username']


class UserCreationForm(forms.ModelForm):
    error_messages = {
        'password_mismatch': _("Les deux mots de passe ne concorde pas."),
    }
    password1 = forms.CharField(
        label=_("Mot de passe"),
        widget=forms.PasswordInput
    )
    password2 = forms.CharField(
        label=_("Confirmation"),
        widget=forms.PasswordInput,
        help_text=_("Entrer le même mot de passe, pour vérifier.")
    )
    was_user = forms.BooleanField(
        label=_("Page sur l'ancien wiki"),
        required=False,
        help_text=_("Si vous aviez une page sur l'ancien wiki, checker ça")
    )

    captcha = ReCaptchaField()

    class Meta:
        model = User
        fields = ("username", "email")

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['password_mismatch'],
                code='password_mismatch',
            )
        return password2

    def is_import(self):
        return self.cleaned_data.get("was_user")

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

    def auth_user(self):
        user = authenticate(
            username=self.cleaned_data.get("username"),
            password=self.cleaned_data.get("password1"),
        )
        return user
