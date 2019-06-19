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


const check_password_is_same = () => {
    const user_pw = $("#new_pwInput").val();
    const user_repw = $("#new_repwInput").val();

    if(user_pw == user_repw){
        return true;
    }
    else if(user_pw != user_repw){
        return false;
    }
}

const check_password_is_valid = () => {
    const user_pw = $("#new_pwInput").val();
    const user_repw = $("#new_repwInput").val();

    if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(user_pw))){
        return false;
    }
    else {
        return true;
    }
}

// '수정하기' 클릭 할 때 
const check_submit_is_valid = () =>{
    const current_pw_valid = $("#current_pwInput").data('checkPwValid');
    const new_pw_valid = $("#new_pwInput").data('checkPwValid');

    console.log(current_pw_valid, new_pw_valid);

    const new_pw_value = $("#new_pwInput").val();
    console.log(new_pw_value);
    if(new_pw_value == ''){
        if(current_pw_valid=='success'){
            alert("정보 수정이 완료되었습니다.");
            return true;
        }
        else{
            alert("회원정보를 확인해주세요.");
            return false;
        }
    }
    else{
        if(current_pw_valid == 'success' && new_pw_valid == 'success'){
            return true;
        }
        else{
            alert("회원정보를 확인해주세요.");
            return false;
        }
    }
}

// 현재 비밀번호 입력 -> db에 가입할 때 입력했던 비밀번호와 일치하는지 확인
$("#current_pwInput").change(function(){
    const current_pw_input = $("#current_pw_input").val();
    console.log(current_pw_input);

    // 함수가 호출될때마다(사용자 한명이 입력할때마다) 객체가 생성
    const formdata = new FormData();
    // 객체가 생성되고 current_pw_input을 객체에 담는다
    formdata.append('current_pw_input',current_pw_input);

    fetch('./check_current_pw',{
        method:'POST',
        body:formdata,
    })
    .then(e=>e.json())
    .then(e =>{
        console.log(e);
        if(e.result == 'success'){
            // window.location.href = '/main/';
            $("#current_pwInput").data(
                'checkPwValid', 'success'
            );
            $(".content-form-currentpwResultWrapper")
            .css({
                'color':'green'
            })
            .html("PASS");
        }
        else if(e.result =='failed'){
            // alert('비밀번호를 확인해주세요.');
            $("#current_pwInput").data(
                'checkpwValid','failed'
            );
            $(".content-form-currentpwResultWrapper")
            .css({
                'color' : 'red'
            })
            .html("비밀번호가 틀렸습니다.");
        }
    })
});


$("#new_pwInput,#new_repwInput").change(function(){
    console.log("!!!!");
    if(check_password_is_same() && check_password_is_valid()){
        $("#new_pwInput").data(
            'checkPwValid','success'
        );
        $(".content-form-pwResultWrapper")
            .css({
                'color':'green'
            })
            .html("PASS");
    }
    else{
        $("#new_pwInput").data(
            'checkPwValid','failed'
        );
        $(".content-form=pwResultWrapper")
            .css({
                'color':'red'
            })
            .html("NON-PASS");
    }
})

// 주소 api
// 우편번호 찾기 찾기 화면을 넣을 element

function foldDaumPostcode() {
    var element_wrap = document.getElementById('wrap');
    // iframe을 넣은 element를 안보이게 한다.
    element_wrap.style.display = 'none';
}

function sample3_execDaumPostcode() {
    var element_wrap = document.getElementById('wrap');
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample3_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample3_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample3_postcode').value = data.zonecode;
            document.getElementById("sample3_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample3_detailAddress").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize : function(size) {
            element_wrap.style.width = '100%';
            element_wrap.style.height = '150vw';
        },
        width : '100%',
        height : '101%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.
    element_wrap.style.display = 'block';
}