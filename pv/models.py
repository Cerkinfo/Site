import django

from django.db import models
from members.models import AcademicYear

REUNION_TYPES = (
    ('N', u'Réunion normale'),
    ('B', u'Réunion de bureau'),
    ('AG', 'Assemblée générale élective'),
)

NICE_TYPE = {'N': u'Réunion',
             'B': u'Réunion du bureau ',
             'AG': u'Assemblée générale élective '
             }


def determine_name(obj, filename):
    return "pv/{year}/{date}.pdf".format(
        year=obj.year,
        date=obj.meeting_date.isoformat()
    )


class PV(models.Model):
    ressource = models.FileField(upload_to=determine_name)
    meeting_date = models.DateField(verbose_name="Date de la réunion")
    upload_date = models.DateField(verbose_name="Date de l'upload",
                                   default=django.utils.timezone.now)
    reunion_type = models.CharField(verbose_name="Type de réunion",
                                    max_length=2,
                                    choices=REUNION_TYPES,
                                    default='N',
                                    blank=True)
    year = models.ForeignKey(AcademicYear,
                             verbose_name='Année de comité du pv')

    def __str__(self):
        return '{} du {}'.format(
            NICE_TYPE[self.reunion_type],
            self.meeting_date.strftime('%d/%m/%Y')
        )