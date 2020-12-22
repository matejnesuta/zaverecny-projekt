from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Profile


@registry.register_document
class ProfileDocument(Document):
    class Index:
        # Name of the Elasticsearch index
        name = 'profiles'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Profile  # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [

            'first_name',
            'last_name'
        ]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True

        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False

        # Paginate the django queryset used to populate the index with the specified size
        # (by default it uses the database driver's default setting)
        queryset_pagination = 5000
# from django_elasticsearch_dsl import Document, fields
# from .models import Profile
# from accounts.models import User
#
#
# @registry.register_document
# class ProfileDocument(Document):
#     profile = fields.ObjectField(properties={
#         'first_name': fields.TextField(),
#         'last_name': fields.TextField(),
#     })
#     user = fields.NestedField(properties={
#         'email': fields.TextField(),
#     })
#
#     class Index:
#         name = 'profiles'
#         settings = {'number_of_shards': 1, 'number_of_replicas': 0}
#
#     class Django:
#         model = Profile
#         fields = [
#             'first_name',
#             'last_name',
#         ]
#         related_models = [User]
#
#     def get_queryset(self):
#         """Not mandatory but to improve performance we can select related in one sql request"""
#         return super(ProfileDocument, self).get_queryset().select_related(
#             'user'
#         )
#
#     # def get_instances_from_related(self, related_instance):
#     #     """If related_models is set, define how to retrieve the Car instance(s) from the related model.
#     #     The related_models option should be used with caution because it can lead in the index
#     #     to the updating of a lot of items.
#     #     """
#     #     if isinstance(related_instance, User):
#     #         return related_instance.car_set.all()
#     #     elif isinstance(related_instance, Ad):
#     #         return related_instance.car
