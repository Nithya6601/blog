from rest_framework import serializers
from . models import Blog

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ['author', 'created_at', 'updated_at']  # these fields will not be editable

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        return super().create(validated_data)