from django.db import models


class Guide(models.Model):
    slug = models.CharField(max_length=5, default='', blank=False)
    title = models.CharField(max_length=150, blank=False, default='')
    disclaimer = models.TextField(default='')
    description = models.TextField(default='')
    active = models.BooleanField(default=False)

    def links(self):
        return self.guideitem_set.all()

    def __str__(self):
        return self.title

class GuideItem(models.Model):
    icon = models.ImageField(upload_to='guide_menu',
                            blank=True)
    description = models.TextField()
    slug = models.CharField(max_length=6,
                            default='',
                            blank=False)
    guide = models.ForeignKey(Guide)

    def __str__(self):
        return self.description