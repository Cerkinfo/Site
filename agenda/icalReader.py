# -*- coding: utf-8 -*-
import datetime
from django.utils import timezone
import urllib.request as urllib
from icalendar import Calendar

class IcalReader(object):
    def __init__(self, calendarUrl):
        super(IcalReader, self).__init__()
        self.url = calendarUrl
        self.calendar = ""
        try:
            self.calendar = urllib.urlopen(self.url)
        except Exception as e:
            print(e)

    @staticmethod
    def jsonify(events):
        """
        @desc: Change a batch of event into a json (readable by javascript
            unlike the python json library).

        @param{events}: Lists of events.
        """

        res = ''
        for event in events:
            res += '{"summary": "%s", "start": "%s", "end": "%s", "description": "%s", "location": "%s", "geo": "%s", "url": "%s", "attach": "%s"},' % (
                repr(event['summary'])[1:-1] if event['summary'] else event['summary'],
                repr(event['start'])[1:-1] if event['start'] else event['start'],
                repr(event['end'])[1:-1] if event['end'] else event['end'],
                repr(event['description'])[1:-1] if event['description'] else event['description'],
                repr(event['location'])[1:-1] if event['location'] else event['location'],
                repr(event['geo'])[1:-1] if event['geo'] else event['geo'],
                repr(event['url'])[1:-1] if event['url'] else event['url'],
                repr(event['attach'])[1:-1] if event['attach'] else event['attach'],
            )

        # res = res[:-1]
        res = '[%s]' % (res)

        res = res.replace("\\", "\\\\")
        res = res.replace("'", "\\'")

        return res

    def read(self):
        """
        @desc: Read the ical file and parse into a dict.
        """
        gcal = Calendar.from_ical(self.calendar.read().decode('iso-8859-1'))
        events = []
        for event in gcal.walk('VEVENT'):
            end = event.decoded('DTEND')
            if type(end) == datetime.date:
                now = datetime.date.today()
            else:
                now = timezone.now()

            if end < now:
                continue

            summary = event.get('SUMMARY')
            description = event.get('DESCRIPTION')
            location = event.get('LOCATION')
            geo = event.get('GEO')
            url = event.get('URL')
            attach = event.get('ATTACH')

            events.append(dict({
                "summary": str(summary) if summary else str(),
                "start": event.decoded('DTSTART').isoformat(),
                "end": event.decoded('DTEND').isoformat(),
                "description": str(description) if description else str(),
                "location": str(location) if location else str(),
                "geo": str(geo) if geo else str(),
                "url": str(url) if url else str(),
                "attach": str(attach) if attach else str(),
            }))

        return events
