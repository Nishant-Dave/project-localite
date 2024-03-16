from django.urls import path, include
from .views import registration_view, login_view, create_post, update_profile, add_comment, send_request, accept_request, reject_request, logout_view, search_users, friend_requests, friend_list, send_message, get_messages
# from . import views

urlpatterns = [
    # path("", chat_view, name="chat-page"),

    path('register/', registration_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('search/', search_users, name='search'),
    path('post/', create_post, name='post'),
    path('profile/', update_profile, name='update_profile'),
    path('add-comment/<int:post_id>/', add_comment, name='add_comment'),
    path('send-request/<int:receiver_id>/', send_request, name='send-request'),
    path('accept-request/<int:sender_id>/', accept_request, name='accept-request'),
    path('reject-request/<int:sender_id>/', reject_request, name='reject-request'),
    path('friend-requests/', friend_requests, name='friend-requests'),
    path('friend-list/', friend_list, name='friend-list'),

    path('send-message/', send_message, name='send_message'),
    path('get-messages/', get_messages, name='get_messages'),
    # path('chat/', chat_view, name="chat-page"),
    # path("", rooms, name="rooms"),
    # path("<str:slug>", room, name="room"),

]

