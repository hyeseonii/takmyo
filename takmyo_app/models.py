from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser) :

    gender = models.CharField(max_length=10, default='unknown')
    address = models.CharField(max_length=255, default='unknown')
    detail_address = models.CharField(max_length=255, default='unknown')
    extra_address = models.CharField(max_length=255, default='unknown')
    postcode = models.CharField(max_length=255, default='unknown')
    phone = models.CharField(max_length=20, default='unknown')
    check_phone = models.BooleanField(default=False)
    is_catsitter = models.BooleanField(default=False)
    is_catee = models.BooleanField(default=False)
    profile_image = models.ImageField(null=True, blank=True, upload_to='profileImage/', default="unknown.png")
    lat = models.FloatField(blank=True,default=0.0)
    Ing = models.FloatField(blank=True,default=0.0)

    
    def __str__(self) :

        return self.username

class Catsitter(models.Model) :

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, default="unknown")
    catsitter_profile_image = models.ImageField(null=True, blank=True, upload_to='catsiiter_profileImage/', default="unknown.png")
    rate = models.FloatField(blank=True, default=0.0)
    have_pet = models.BooleanField(default=False)
    have_pet_experience = models.BooleanField(default=False)
    care_experience = models.BooleanField(default=False)
    available_pill = models.BooleanField(default=False)
    available_visit = models.BooleanField(default=False)
    available_consignment = models.BooleanField(default = False)

    visit_price_per_once = models.IntegerField(default=0)
    visit_price_per_extra_cat = models.IntegerField(default=0)

    consignment_price_per_one_day = models.IntegerField(default=0)
    consignment_price_per_one_week= models.IntegerField(default=0)
    consignment_price_per_one_month = models.IntegerField(default=0)
    consignment_price_per_extra_cat = models.IntegerField(default=0)

    register_date = models.DateTimeField(auto_now_add=True)
   
    available_weekday_am = models.BooleanField(default=False)
    available_weekday_pm = models.BooleanField(default=False)

    available_weekend_am = models.BooleanField(default=False)
    available_weekend_am = models.BooleanField(default=False)

    available_region = models.TextField(default="")

    introduce = models.TextField(default="")
    
    warning = models.TextField(default="")


    def __str__(self) :

        return self.user.username

    class Meta :

        ordering = ['-register_date']


class Catsitter_promotion_image(models.Model) :

    catsitter = models.ForeignKey(Catsitter, on_delete=models.CASCADE, related_name='catsiiter_promotion_image')
    promotion_image = models.ImageField(null=True, blank=True, upload_to='catsiiter_promotionImage/', default="unknown.png")


    def __str__(self) :

        return self.catsitter.user.username 


class Notification(models.Model) :

    CATEGORY_CHOICES = {
        ('review','Review'),
        ('form','Form')
    }

    created_at = models.DateTimeField(auto_now_add = True)
    creator = models.ForeignKey(User,
                                on_delete= models.CASCADE,
                                null = True,
                                blank= True,
                                related_name= 'create_notifications')
    receiver = models.ForeignKey(User,
                                on_delete = models.CASCADE,
                                null = True,
                                blank= True,
                                related_name='receive_notifications')
    content = models.TextField()
    category = models.CharField(max_length = 30, choices=CATEGORY_CHOICES, null=True)
    is_checked= models.BooleanField(default = False)
    
    def __str__(self) :
        
        return self.creator.username + ' - ' + self.receiver.username+ ' - ' +  self.category


    class Meta :
        
        ordering = ['-created_at']
