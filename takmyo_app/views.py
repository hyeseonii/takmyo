from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *

# Create your views here.
def index(request) :

    user = request.user

    if user.is_authenticated :

        notifications_count = user.receive_notifications.filter(is_checked=False).count()

        print(notifications_count)

        context = {'user' : user, 'notifications_count' : notifications_count}

        return render(request, 'takmyo_app/index.html', context)
        
    elif user.is_anonymous:
    
        return render(request, 'takmyo_app/index.html')


def join(request) :

    if request.method == 'GET' :

        return render(request, 'takmyo_app/join.html')


    if request.method == 'POST' :

        user_id = request.POST['user_id']
        user_pw = request.POST['user_pw']
        user_gender = request.POST['user_gender']
        user_postcode = request.POST['user_postcode']
        user_address = request.POST['user_address']
        user_detail_address = request.POST['user_detail_address']
        user_extra_address = request.POST.get('user_extra_address','')
        user_phone = request.POST['user_phone']

        if request.POST.get('user_check_phone','unchecked') == 'checked' :
            user_check_phone = True
        else :
            user_check_phone = False

        print(user_id,
                user_pw,
                user_gender,
                user_address,
                user_detail_address,
                user_extra_address,
                user_phone,
                user_check_phone)

        User = get_user_model()
        new_user = User.objects.create_user(
            username = user_id,
            password = user_pw,
            gender = user_gender,
            address = user_address,
            postcode = user_postcode,
            detail_address = user_detail_address,
            extra_address = user_extra_address,
            phone = user_phone,
            check_phone = user_check_phone
        )

        print(new_user)

        return redirect('/login/')


@csrf_exempt
def my_login(request) :

    if request.method == 'GET' :

        return render(request, 'takmyo_app/login.html')
    
    elif request.method =='POST' :

        print("!!!!!!")

        user_id = request.POST['user_id']
        user_pw = request.POST['user_pw']

        user = authenticate(username = user_id, password = user_pw)

        if user is not None :
            login(request, user)
            result = {"result":"success"}
        
        else :

            result ={"result":"failed"}
        
        return JsonResponse(result)


@csrf_exempt
def check_id_duplicate(request,user_id) :

    User = get_user_model()

    try: 
        user = User.objects.get(username = user_id)

        result = {"result":"failed"}
    
    except:

        result = {"result":"success"}
    
    print(result)

    return JsonResponse(result)

   

def notification(request) :
    
    user = request.user

    if user.is_authenticated:
    
        notifications = user.receive_notifications.all()

        context = {'user': user, 'notifications': notifications}

        return render(request, 'takmyo_app/notification.html',context)

    else :

        return redirect('/login/')


def delete_checked_notification(request) :

    user = request.user

    try :
        checked_notification = user.receive_notifications.filter(is_checked=True).delete()
        result = {'result' : 'success'}
    
    except:
        result = {'result' : 'failed'}
    
    return JsonResponse(result)


def delete_all_notification(request) :

    user = request.user

    try : 
        all_notification = user.receive_notifications.all().delete()
        result = {'result':'success'}

    except :
        result = {'result':'failed'}
    
    return JsonResponse(result)
    

def check_notification(request, noti_id) :

    user = request.user

    try:
        checked_notification = Notification.objects.get(id=noti_id, receiver=user)
        checked_notification.is_checked = True
        checked_notification.save()
        result = {'result':'success'}

    except:
        result ={'result':'failed'}
    
    return JsonResponse(result)


def catsitter_mode(request) :

    return render(request,'takmyo_app/catsitter_mode.html')


@csrf_exempt 
def check_current_pw(request) :

    user = request.user

    current_pw_input = request.POST['current_pw_input']

    valid_user = authenticate(username = user.username,password = current_pw_input)

    if valid_user is not None :
        result = {"result" : "success"}
    else :
        result = {"result" : "failed"}

    return JsonResponse(result)


def mypage(request) :

    user = request.user

    # 비밀번호 재입력 화면 호출시 로그인 되어 있으면 -> mypage.html로 정상적 이동
    if user.is_authenticated :

        context = {'user':user}

        return render(request,'takmyo_app/mypage.html',context)

    else :
        
        return redirect('/login/')


def modify_myinfo(request) :

    return render(request,'takmyo_app/modify_myinfo.html')


def my_logout(request) :

    logout(request)

    return redirect('/main/')