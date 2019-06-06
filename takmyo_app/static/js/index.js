const open_menu = () =>{
    $(".menu").animate({
        'right': '0%'
    });
}

const close_menu = () =>{
    $(".menu").animate({
        'right':'-100%'
    });
}

var position = $(window).scrollTop();

var f = 0;
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if(scroll > position && f==0) {
        $('html,body')
        .animate({
            scrollTop: $(".content2").offset().top
        }, 1000);
        $("#div-index-circle1").css({
            'background-color':'gray',
            'opacity':'0.5'
        });
        $("#div-index-circle2").css({
            'background-color':'black',
            'opacity':'1'
        });
        f=1;
        setTimeout(function(){
            f=0;
        },1200);
    }
    else if(scroll<=position && f==0){
        $('html,body')
        .animate({
            scrollTop: 0
        }, 1000);
        $("#div-index-circle1").css({
            'background-color':'black',
            'opacity':'1'
        });
        $("#div-index-circle2").css({
            'background-color':'gray',
            'opacity':'0.5'
        });
        f=1;
        setTimeout(function(){
            f=0;
        },1200);
    }
    position = scroll;
});