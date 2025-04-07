from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from . models import Blog
from .serializers import BlogSerializer

# Create your views here.

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_serializer_context(self):
        return { 'request': self.request }
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def myblogs(self, request):
        user = request.user
        blogs = Blog.objects.filter(author=user).order_by('-created_at')
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)
    
def index(request):
    return render(request, 'index.html')