"""
ASGI config for localite project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

# import os
# from django.core.asgi import get_asgi_application
# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter

# from django.urls import path
# from localite import routing
# import localite.routing


# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'localite.settings')

# application = ProtocolTypeRouter(
# 	{
# 		"http" : get_asgi_application() , 
# 		"websocket" : AuthMiddlewareStack(
# 			URLRouter(
# 				localite.routing.websocket_urlpatterns
# 			) 
# 		)
# 	}
# )



import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'localite.settings')

application = get_asgi_application()
