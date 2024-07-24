from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article, Comment
from users.serializers import UserSerializer

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    replies = RecursiveField(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at', 'parent', 'replies']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'user', 'title', 'image', 'introduction', 'post_data', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class ArticleDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'user', 'title', 'image', 'introduction', 'post_data', 'created_at', 'likes', 'comments']
        read_only_fields = ['id', 'user', 'created_at']

    def get_likes(self, obj):
        return [user.id for user in obj.likes.all()]

