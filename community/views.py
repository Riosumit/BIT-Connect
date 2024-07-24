from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .models import Article, Tag, Comment
from .serializers import ArticleSerializer, ArticleDetailSerializer, CommentSerializer

class MyArticleView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, format=None):
        if pk:
            try:
                article = Article.objects.get(pk=pk, user=request.user)
            except Article.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = ArticleDetailSerializer(article)
            return Response(serializer.data)
        else:
            articles = Article.objects.filter(user=request.user)
            serializer = ArticleDetailSerializer(articles, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        tags = request.data.pop('tags', [])  # Extract tags from request data
        serializer = ArticleSerializer(data=request.data, context={"user": request.user})
        if serializer.is_valid():
            post = serializer.save(user=request.user)

            # Handle tags
            tag_objects = []
            for tag_name in tags:
                tag, created = Tag.objects.get_or_create(name=tag_name)
                tag_objects.append(tag)

            # Associate tags with the post
            post.tags.set(tag_objects)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        try:
            article = Article.objects.get(pk=pk, user=request.user)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            article = Article.objects.get(pk=pk, user=request.user)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ArticleView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, pk=None, format=None):
        if pk:
            try:
                article = Article.objects.get(pk=pk)
            except Article.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
            serializer = ArticleDetailSerializer(article)
            return Response(serializer.data)
        else:
            articles = Article.objects.filter()
            serializer = ArticleDetailSerializer(articles, many=True)
            return Response(serializer.data)
        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def like_article(request, article_id):
    try:
        article = Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.user in article.likes.all():
        article.likes.remove(request.user)
    else:
        article.likes.add(request.user)
    article.save()
    serializer = ArticleSerializer(article)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def comment_article(request, article_id):
    try:
        article = Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    request.data['user'] = request.user
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        article.comments.add(serializer.instance)
        article.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def reply_comment(request, article_id, comment_id):
    try:
        article = Article.objects.get(pk=article_id)
        parent_comment = Comment.objects.get(pk=comment_id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, parent=parent_comment)
        article.comments.add(serializer.instance)
        article.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_comments(request, article_id):
    try:
        article = Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    comments = Comment.objects.filter(article=article)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)