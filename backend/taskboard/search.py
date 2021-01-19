from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    LOOKUP_QUERY_EXCLUDE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    IdsFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    SearchFilterBackend,
)
from django_elasticsearch_dsl_drf.viewsets import BaseDocumentViewSet
from django_elasticsearch_dsl_drf.pagination import PageNumberPagination

from .documents import Profile
from .serializers import ProfileSerializer


class ProfileDocumentView(BaseDocumentViewSet):
    document = Profile
    serializer_class = ProfileSerializer
    pagination_class = PageNumberPagination
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        IdsFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]

    search_fields = (
        'first_name',
        'last_name',
    )
    # Define filter fields
    filter_fields = {
        "first_name": "first_name.raw",
        "last_name": "last_name.raw"
    }
    # Define ordering fields
    ordering_fields = {
        'id': 'id',
        'first_name': 'first_name.raw',
        'last_name': 'last_name.raw',
    }
    # Specify default ordering
    ordering = ('first_name', 'last_name', 'id',)
