from django.urls import path , include,re_path
from .users import ChatUser

websocket_urlpatterns = [
	path("" , ChatUser.as_asgi()) , 
]



# websocket_urlpatterns = [
# 	path("<room_slug>" , ChatUser.as_asgi()) ,
#     re_path(r'^ws/(?P<room_slug>[^/]+)/$', ChatUser.as_asgi()),
# ]

