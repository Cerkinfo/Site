# -*- coding: utf-8 -*-
import datetime
from django.utils import timezone
import urllib.request as urllib
from icalendar import Calendar

class IcalReader(object):
    def __init__(self, url):
        super(IcalReader, self).__init__()
        self.url = url
        self.events = []
        for ical in IcalReader.fetch_ical(list(url)):
            self.events += IcalReader.read(ical)

    @staticmethod
    def fetch_ical(urls):
        """
        """
        for u in urls:
            try:
                yield urllib.urlopen(u).read()# .decode('iso-8859-1')
            except Exception as e:
                print(e)

    def jsonify(self):
        """
        @desc: Change a batch of event into a json (readable by javascript
            unlike the python json library).

        @param{events}: Lists of events.
        """

        res = ''
        for event in self.events:
            res += '{"summary": "%s", "start": "%s", "end": "%s", "description": "%s", "location": "%s", "geo": "%s", "url": "%s", "attach": "%s"},' % (
                event['summary'],
                event['start'],
                event['end'],
                event['description'],
                event['location'],
                event['geo'],
                event['url'],
                event['attach'],
            )

        res = res[:-1] # Erase last ","


        res = repr('[%s]' % (res))[1:-1]
        res = res.replace('\\\\"', '\\"')

        return res

    def get(self):
        return self.events

    @staticmethod
    def read(ical):
        """
        @desc: Read the ical file and parse into a dict.
        """
        gcal = Calendar.from_ical(ical)
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
