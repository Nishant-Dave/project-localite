from rest_framework import status, generics
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from accounts.serializers import UserSerializer, PostSerializer, UserProfileSerializer, CommentSerializer, FriendStatusSerializer
from .models import CustomUser, Post, UserProfile, Comment, FriendStatus, Message
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404, render, redirect
from django.db.models import Q


# # ----------------------- REGISTRATION VIEW ----------------------


@api_view(['POST'])
@permission_classes([AllowAny])
def registration_view(request):
    if request.method == 'POST':

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# # ------------------------------- LOGIN VIEW ------------------------


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'POST':
        email = request.data.get('email_id')
        password = request.data.get('password')

        user = authenticate(email_id=email, password=password)
               
        if user:
            
            user_name = user.name
                        
            user_email = user.email_id
            
            tokens = user.generate_tokens()
            
            user_name = user.name

            return Response({'name': user_name, 'user_email': user_email, 'tokens': tokens}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        



# ------------------------------------- LOGOUT VIEW ----------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):

    try:
        response = Response({'message': 'User logged out successfully'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        return response
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# --------------------- REGISTERED USERS VIEW API ------------------------



# class RegisteredUsersAPIView(generics.ListAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]  # Optionally, restrict access to authenticated users

#     def get_queryset(self):
#         queryset = CustomUser.objects.all()
#         search_query = self.request.query_params.get('search', None)
#         if search_query:
#             queryset = queryset.filter(
#                 Q(name__icontains=search_query) | Q(email_id__icontains=search_query)
#             )
#         return queryset


# -------------------------  SEARCH USER ----------------------------

def search_users(request):
    query = request.GET.get('query', '')
    # Perform search logic here, such as filtering users based on the query
    users = CustomUser.objects.filter(name__icontains=query)
    # users = CustomUser.objects.filter(Q(name__icontains=search_query) | Q(email_id__icontains=search_query))


    # Serialize the search results
    results = [{'id': user.id, 'name': user.name} for user in users]
    print(id)
    return JsonResponse(results, safe=False)


# -------------------------------- USER POST VIEW -------------------------------


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_view(request):
    if request.method == 'POST':
        # Extract 'content' from request data
        content = request.data.get('content')

        # Set 'user' to the id of the logged-in user
        user_email = request.user.email_id
        
        # Create dictionary with 'content' and 'user'
        post_data = {'content': content, 'user': user_email}

        # Create serializer instance with the post data
        serializer = PostSerializer(data=post_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ------------------------ ADD COMMENT CODE ------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, post_id):
    try:
        user_email = request.user.email_id
        # post_id = Post.objects.get(id=post_id)    
        content = request.data.get('comment_text')
        print(post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)
    

    comment_data = {'user': user_email, 'post': post_id, 'comment_text': content}
    serializer = CommentSerializer(data=comment_data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)




# -------------------------------------- UPDATE PROFILE VIEW ------------------------------

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    if request.method == 'PUT':
        email = request.user.email_id
        fname = request.data.get('first_name')
        lname = request.data.get('last_name')
        city = request.data.get('city')
        bio = request.data.get('bio')
        
        print(email)
        profile_data = {'first_name': fname, 'last_name': lname, 'city': city, 'bio': bio}

        serializer = UserProfileSerializer(data=profile_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def update_profile(request):
#     if request.method == 'PUT':
#         email = request.user.email_id
#         city = request.data.get('city')
#         bio = request.data.get('bio')
        
#         profile_data = {'email_id': email, 'city': city, 'bio': bio}
#         # Optionally include first_name and last_name if they are provided in the request
#         first_name = request.data.get('first_name')
#         last_name = request.data.get('last_name')
#         if first_name is not None:
#             profile_data['first_name'] = first_name
#         if last_name is not None:
#             profile_data['last_name'] = last_name

#         serializer = UserProfileSerializer(data=profile_data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# ------------------------------------- FRIEND STATUS -----------------------


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
@permission_classes([IsAuthenticated])
def send_request(request, receiver_id):
    receiver = get_object_or_404(CustomUser, id=receiver_id)

    if receiver == request.user:
        return Response({'error': 'You cannot send a friend request to yourself'}, status=status.HTTP_400_BAD_REQUEST)
    
    if FriendStatus.objects.filter(sender=request.user, receiver=receiver).exists():
        return Response({'error': 'Friend request already sent'}, status=status.HTTP_400_BAD_REQUEST)
    
    friend_request = FriendStatus.objects.create(sender=request.user, receiver=receiver, status='Pending')
    return Response({'message': 'Friend request sent'}, status=status.HTTP_201_CREATED)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request, sender_id):
    # print("Sender ID:", sender_id)  
    # print("Receiver ID:", request.user.id) 
    # print(request.user)

    friend_request = get_object_or_404(FriendStatus, sender=sender_id, receiver=request.user, status='Pending')
    
    friend_request.status = 'Friends'
    friend_request.save()
    
    return Response({'message': 'Friend request accepted'}, status=status.HTTP_200_OK)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reject_request(request, sender_id):

    # print("Sender ID:", sender_id)  
    # print("Receiver ID:", request.user.id) 

    friend_request = get_object_or_404(FriendStatus, sender=sender_id, receiver=request.user, status='Pending')

    friend_request.delete()
    return Response({'message': 'Friend request rejected'}, status=status.HTTP_200_OK)


# ------------------------------ FRIEND REQUEST -----------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_requests(request):
    # Get all friend requests received by the authenticated user
    friend_requests = FriendStatus.objects.filter(receiver=request.user)
    serializer = FriendStatusSerializer(friend_requests, many=True)
    return Response(serializer.data)


# ------------------------------- FRIEND LIST ------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friend_list(request):
    # Get all friends with the 'friends' status for the authenticated user
    friends = FriendStatus.objects.filter(sender=request.user, status='F') | FriendStatus.objects.filter(receiver=request.user, status='F')
    friend_serializer = FriendStatusSerializer(friends, many=True)
    return Response(friend_serializer.data)


# ------------------------------- CHAT VIEWS -------------------------------

def chat_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("login")
    context = {}
    return render(request, "chat/chatPage.html", context)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
 
# def rooms(request):
#     rooms=Room.objects.all()
#     return render(request, "rooms.html",{"rooms":rooms})

# def room(request,slug):
#     room_name=Room.objects.get(slug=slug).name
#     messages=Message.objects.filter(room=Room.objects.get(slug=slug))
    
#     return render(request, "room.html",{"room_name":room_name,"slug":slug,'messages':messages})


# def chat_view(request, *args, **kwargs):
#     if not request.user.is_authenticated:
#         return redirect("login")
#     context = {}
#     return render(request, "chat/chatPage.html", context)
