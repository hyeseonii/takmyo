from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('main/',views.index),

    path('join/',views.join),
    path('join/check_id_duplicate/<str:user_id>/',views.check_id_duplicate),

    path('login/',views.my_login),

    path('notification/',views.notification),
    path('notification/delete/checked/',views.delete_checked_notification),
    path('notification/delete/all/',views.delete_all_notification),
    path('notification/check/<int:noti_id>/',views.check_notification),

    path('catsitter_mode/',views.catsitter_mode),

    path('mypage/',views.mypage),
    path('modify_myinfo/', views.modify_myinfo),
    path('modify_myinfo/check_current_pw/', views.check_current_pw), 

    path('catsitter_search/',views.catsitter_search),
    path('catsitter_search/get_user_list/distance/', views.get_user_list_by_distance),
    path('catsitter_search/get_user_list/rate/', views.get_user_list_by_rate), 
    path('show_catsitter/<int:catsitter_id>/', views.show_catsitter),
    path('show_catsitter/<int:catsitter_id>/register_review/<str:time_rate>/<str:kindness_rate>/<str:achievement_rate>/<str:review_comment>/', views.register_review),

    path('register_cat/', views.register_cat),

    path('base/',views.base),



]