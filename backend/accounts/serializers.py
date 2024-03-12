from rest_framework import serializers
from accounts.models import CustomUser, Post, UserProfile, Comment, FriendStatus

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email_id', 'password')

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            name=validated_data.get('name'),
            email_id=validated_data.get('email_id'),
            password=validated_data.get('password')
        )




class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content', 'user']



class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name','bio', 'city', 'email_id']
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def validate(self, data):
        if not data.get('first_name'):
            data.pop('first_name', None)
        if not data.get('last_name'):
            data.pop('last_name', None)
        return data


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['user', 'post', 'comment_text']


class FriendStatusSerializer(serializers.ModelSerializer):
    
    # def get_sender_name(self, obj):
    #     return obj.sender.name
    sender_name = serializers.CharField(source='sender.name', read_only=True)


    class Meta:
        model = FriendStatus
        fields = ['sender', 'receiver', 'status', 'created_at', 'sender_name']

