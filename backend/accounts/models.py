from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserManager(BaseUserManager):
    def create_user(self, email_id, password=None, **extra_fields):
        if not email_id:
            raise ValueError('The Email ID field must be set')
        email_id = self.normalize_email(email_id)
        user = self.model(email_id=email_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email_id, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email_id, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=30, unique=True)
    email_id = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email_id'
    REQUIRED_FIELDS = ['name']

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.email_id

    def generate_tokens(self):
        refresh = RefreshToken.for_user(self) 
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }



# class CustomUserManager(BaseUserManager):
#     def create_user(self, email_id, password=None, **extra_fields):
#         email_id = self.normalize_email(email_id)
#         user = self.model(email_id=email_id, **extra_fields)
#         if password:
#             user.set_password(password)
#         user.save(using=self._db)
#         return user

#     # def create_superuser(self, email_id, password=None, **extra_fields):
#     #     extra_fields.setdefault('is_staff', True)
#     #     extra_fields.setdefault('is_superuser', True)

#     #     if extra_fields.get('is_staff') is not True:
#     #         raise ValueError('Superuser must have is_staff=True.')
#     #     if extra_fields.get('is_superuser') is not True:
#     #         raise ValueError('Superuser must have is_superuser=True.')

#     #     return self.create_user(email_id, password, **extra_fields)


#     def create_superuser(self, email_id, password=None, **extra_fields):
#         user = self.create_user(email_id, password, **extra_fields)
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user


# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     name = models.CharField(max_length=30, unique=True)
#     email_id = models.EmailField(unique=True)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email_id'
#     REQUIRED_FIELDS = ['name']

#     class Meta:
#         db_table = 'users'


#     def __str__(self):
#         return self.email_id

#     def generate_tokens(self):
#         refresh = RefreshToken.for_user(self)
#         return {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         }




class Post(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='id')

    class Meta:
        db_table = 'user_post'




class UserProfile(models.Model):
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    email_id = models.EmailField(default='email')
    city = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='id', default=1)
    # profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)


    def __str__(self):
        return self.user.email_id
    
    class Meta:
        db_table = 'user_profile'


class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='id', default=1)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, to_field='id', default=1)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'add_comment'



class FriendStatus(models.Model):
    status_choice = {
        ('N', 'None'),
        ('P', 'Pending'),
        ("F", 'Friends')
    }
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='id', default=1, related_name='sent_friend_status')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='id', default=1, related_name='received_friend_status')
    status = models.TextField(choices=status_choice)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        db_table = 'friend_status'


# --------------------------- CHAT MODEL ---------------------------


class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages', db_column='sender')
    recipient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages', db_column='recipient')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'chat_table'
        managed = False


# class Room(models.Model):
#     name = models.CharField(max_length=20)
#     slug = models.SlugField(max_length=100)


#     def __str__(self):
#         return "Room : "+ self.name + " | Id : " + self.slug
    
#     class Meta:
#         db_table = 'chat_room'

    

# class Message(models.Model):
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     content = models.TextField()
#     room = models.ForeignKey(Room, on_delete=models.CASCADE)
#     created_on = models.DateTimeField(auto_now_add=True)


#     def __str__(self):
#         return "Message is :- "+ self.content
    
#     class Meta:
#         db_table = 'message'


