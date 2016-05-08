import time

from django.db import models
from members.models import AcademicYear

REUNION_TYPES = (
    ('N', u'Réunion normale'),
    ('B', u'Réunion de bureau'),
    ('AG', 'Assemblée générale élective'),
)


def determine_name(obj, filename):
    return "pv/{year}/{date}.pdf".format(
        year=obj.year,
        date=obj.meeting_date.isoformat()
    )


class PV(models.Model):
    resource = models.FileField(upload_to=determine_name)
    meeting_date = models.DateField(verbose_name="Date de la réunion")
    upload_date = models.DateField(verbose_name="Date de l'upload",
                                   default=time.now())
    reunion_type = models.CharField(verbose_name="Type de réunion",
                                    choices=REUNION_TYPES,
                                    default='N',
                                    blank=True)
    year = models.ForeignKey(AcademicYear,
                             verbose_name='Année de comité du pv')