from django.db import models
from tinymce import models as tinymce_models


class Guide(models.Model):
    slug = models.CharField(max_length=5, default='', blank=False)
    title = models.CharField(max_length=150, blank=False, default='')
    disclaimer = models.TextField(default='')
    description = models.TextField(default='')
    active = models.BooleanField(default=False)

    def items(self):
        return self.guideitem_set.all()

    def __str__(self):
        return self.title

class GuideItem(models.Model):
    icon = models.ImageField(upload_to='guide_menu',
                            blank=True)
    title = models.CharField(default='',
                             blank=False,
                             max_length=70)
    description = tinymce_models.HTMLField(default='')
    slug = models.CharField(max_length=6,
                            default='',
                            blank=False)
    guide = models.ForeignKey(Guide)
    remarq = tinymce_models.HTMLField(default='', blank=True)
    content = tinymce_models.HTMLField(default='', blank=True)
    advice = tinymce_models.HTMLField(default='', blank=True)

    def __str__(self):
        return self.title