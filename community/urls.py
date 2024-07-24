from django.contrib import admin
from django.urls import path
from .views import ArticleView, MyArticleView, get_comments, comment_article, like_article, reply_comment

urlpatterns = [
    path('/articles/', ArticleView.as_view(), name='articles'),
    path('/articles/<int:pk>/', ArticleView.as_view(), name='article-detail'),
    path('/my-articles/', MyArticleView.as_view(), name='my-articles'),
    path('/my-articles/<int:pk>/', MyArticleView.as_view(), name='my-article-detail'),

    # Comment URLs
    path('/articles/<int:article_id>/comments/', get_comments, name='get_comments'),
    path('/articles/<int:article_id>/comment/', comment_article, name='create_comment'),
    path('/articles/<int:article_id>/comment/<int:comment_id>/reply', comment_article, name='create_comment'),
    # path('comments/<int:pk>/update/', update_comment, name='update_comment'),
    # path('comments/<int:pk>/delete/', delete_comment, name='delete_comment'),

    # Like URLs
    path('/articles/<int:article_id>/like/', like_article, name='like_article'),
]
