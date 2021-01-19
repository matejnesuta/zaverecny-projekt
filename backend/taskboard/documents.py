from django.conf import settings
from django_elasticsearch_dsl import Document, Index, fields
from elasticsearch_dsl import analyzer

from .models import Profile

INDEX = Index("profile")

# See Elasticsearch Indices API reference for available settings
INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)

html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)


@INDEX.doc_type
class Profile(Document):
    id = fields.IntegerField(attr='id')
    first_name = fields.KeywordField(
        analyzer=html_strip,
        fields={
            'raw': fields.KeywordField(analyzer='keyword'),
        }

    )
    last_name = fields.KeywordField(
        analyzer=html_strip,
        fields={
            'raw': fields.KeywordField(analyzer='keyword'),
        }
    )

    class Django(object):
        """Inner nested class Django."""
        model = Profile
