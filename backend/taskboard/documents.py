from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Profile


@registry.register_document
class ProfileDocument(Document):
    class Index:
        name = 'profiles'
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Profile
        fields = [
            'first_name',
            'last_name'
        ]
        queryset_pagination = 5000
