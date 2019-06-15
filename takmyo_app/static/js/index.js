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

// var f = 0;
// $(window).scroll(function() {
//     var scroll = $(window).scrollTop();

//     if(scroll > position && f==0) {
//         $('html,body')
//         .animate({
//             scrollTop: $(".content2").offset().top
//         }, 1000);
//         $("#div-index-circle1").css({
//             'background-color':'gray',
//             'opacity':'0.5'
//         });
//         $("#div-index-circle2").css({
//             'background-color':'black',
//             'opacity':'1'
//         });
//         f=1;
//         setTimeout(function(){
//             f=0;
//         },1200);
//     }
//     else if(scroll<=position && f==0){
//         $('html,body')
//         .animate({
//             scrollTop: 0
//         }, 1000);
//         $("#div-index-circle1").css({
//             'background-color':'black',
//             'opacity':'1'
//         });
//         $("#div-index-circle2").css({
//             'background-color':'gray',
//             'opacity':'0.5'
//         });
//         f=1;
//         setTimeout(function(){
//             f=0;
//         },1200);
//     }
//     position = scroll;
// });



$(document).ready(function(){
    $(document)
    .on("mousedown", function(event){
        // console.log(event.pageX);
    })



    .mousemove(function(event){
        // console.log(event.pageX);
    })



    .on("mouseup", function(){
        // console.log(event.pageX);
    });
    // $('html, body')
    //     .animate({
    //         scrollTop: $(".content2").offset().top
    //     }, 500);

});


var is_animating = false;

$(document).ready(function() {
    var start_position = 0;
    var move_position = 0;

    // 터치가 시작될 때 
    $(document).bind('touchstart', function(e) {

        // console.log("터치가 시작되었어요.");

        var event = e.originalEvent;

        // console.log(event.touches[0].screenX,event.touches[0].screenY);

        // 터치를 시작할 때 현재 스크린 Y값을 저장
        start_position = event.touches[0].screenY;
    });


    // 터치가 움직일 때 
    $(document).bind('touchmove', function(e) {
        var event = e.originalEvent;
        // console.log('touch 이벤트 중입니다.'); 
        //console.log(event.touches[0].screenX,event.touches[0].screenY);
        
        // 터치가 시작했을 때 Y좌표 값을 받음
        move_position = event.touches[0].screenY;
        // 아래로 드래그한건지 위로 드래그한건지를 판별하기 위해
        // start 했을 때의 Y좌표랑 move 했을 때의 Y좌표를 비교
        // 0보다 크면 위로 드래그 -> 아래로 이동
        if((move_position - start_position) > 0){
            if(is_animating == false){
                is_animating = true;
                // console.log('down');

                //scrollTop: 현재 화면의 가장 위를 어디에 맞출지
                //scrollTop: 0 -> 가장 위로 
                // 현재 화면의 scroll의 Top을 0으로 맞추는데 0.5초 동안의 애니메이션으로 진행되게 
                $('html, body')
                .stop()
                .animate({
                    scrollTop: 0
                }, 500);

                $("#div-index-circle1").css({
                    'background-color' : 'gray',
                    'opacity' : '0.5'
                });

                $("#div-index-circle2").css({
                    'background-color' : 'black',
                    'opacity' : '1'
                });
                setTimeout(function(){
                    is_animating = false;
                },600);
            }
        }
        // 0보다 작으면 아래로 드래그 -> 위로 이동
        else {
            if(is_animating == false){
                is_animating = true;
                // console.log('up');
                $('html, body')
                // .stop() : 그 전에 진행되고 있던 애니메이션은 멈추고 이 애니메이션을 다시 새롭게 실행해라
                // .stop() : 애니메이션이 안 밀리게 하고 싶을 때 
                .stop()
                .animate({
                    // 현재 화면의 top을 class가 content2인 div의 탑 위치로
                    scrollTop: $(".content2").offset().top
                }, 500);
                $("#div-index-circle2").css({
                    'background-color' : 'gray',
                    'opacity' : '0.5'
                });
                $("#div-index-circle1").css({
                    'background-color' : 'black',
                    'opacity' : '1'
                });
                setTimeout(function(){
                    is_animating = false;
                },600);
            }

        }
        // event.preventDefault();

    });


    // 터치가 끝났을 때 
    $(document).bind('touchend', function(e) {
        // console.log("터치이벤트가 종료되었어"); 
        // e.preventDefault();
    });
});



