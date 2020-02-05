from django.apps import AppConfig


class MainappConfig(AppConfig):
    name = 'mainApp'

    def ready(self):
        from . import signals
