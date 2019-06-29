const open_menu = () =>{
    $(".menu").animate({
        'right' : '0%'
    });
}

const close_menu = () =>{
    $(".menu").animate({
        'right' : '-100%'
    });
}

function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist.toFixed(3);
    }
}

const cmp = (x, y) =>{
    return x > y ? 1 : x < y ? -1 : 0; 
};


const searching_catsitter = () =>{
    const place_value = $('select[id=select_place]').val();
    const have_pet_value = $('select[id=select_havePet]').val();
    const time_value = $('input[name=time]:checked').val();
    const gender_value = $('input[name=gender]:checked').val();
    const pill_value = $('input[name=pill]:checked').val();

    console.log(place_value, have_pet_value, time_value, gender_value, pill_value);
}

$(document).ready(function(){
    const lat = $("#sample3_address").data('lat');
    const lng = $("#sample3_address").data('lng');

    console.log(lat, lng);

    const catsitters= $(".content-catsitter-item-info-distance_text");
    console.log(catsitters);
    for(var catsitter of catsitters){
        console.log($(catsitter).data('catsitterLat'), $(catsitter).data('catsitterLng'));
        const catsitter_lat = $(catsitter).data('catsitterLat');
        const catsitter_lng = $(catsitter).data('catsitterLng');
        $(catsitter).html("~" + String(distance(lat, lng, catsitter_lat, catsitter_lng, 'K')) + "km");
    }

    const selected_distance = $('#select_distance').val();
    console.log(selected_distance);

    let select_distance = 0;
    if(selected_distance == '5km'){
        select_distance = 5;
    }
    else if(selected_distance == '10km'){
        select_distance = 10;
    }
    else if(selected_distance == '20km'){
        select_distance = 20;
    }
    else if(selected_distance == 'all'){
        select_distance = 100000;
    }

    for(var catsitter of catsitters){
        console.log($(catsitter).data('catsitterLat'), $(catsitter).data('catsitterLng'));
        const catsitter_lat = $(catsitter).data('catsitterLat');
        const catsitter_lng = $(catsitter).data('catsitterLng');
        const catsitter_id = $(catsitter).data('catsitterId');
        const catsitter_distance = distance(lat, lng, catsitter_lat, catsitter_lng, 'K');

        if(select_distance < catsitter_distance){
            $('#catsitter_' + catsitter_id).hide();
        }
        else{
            $('#catsitter_' + catsitter_id).show();
        }
    }
});

$("#select_place").change(function(){
    const current_value = $(this).val();
    console.log(current_value);

    if(current_value == 'consignment'){
        $("#select_havePet").attr({
            'disabled' : false
        });
    }
    else{
        $("#select_havePet").attr({
            'disabled' : true
        });
    }
});

$("#select_distance").change(function(){
    const lat = $("#sample3_address").data('lat');
    const lng = $("#sample3_address").data('lng');

    const selected_distance = $(this).val();
    console.log(selected_distance);

    let select_distance = 0;
    if(selected_distance == '5km'){
        select_distance = 5;
    }
    else if(selected_distance == '10km'){
        select_distance = 10;
    }
    else if(selected_distance == '20km'){
        select_distance = 20;
    }
    else if(selected_distance == 'all'){
        select_distance = 100000;
    }

    const catsitters= $(".content-catsitter-item-info-distance_text");

    for(var catsitter of catsitters){
        console.log($(catsitter).data('catsitterLat'), $(catsitter).data('catsitterLng'));
        const catsitter_lat = $(catsitter).data('catsitterLat');
        const catsitter_lng = $(catsitter).data('catsitterLng');
        const catsitter_id = $(catsitter).data('catsitterId');
        const catsitter_distance = distance(lat, lng, catsitter_lat, catsitter_lng, 'K');

        if(select_distance < catsitter_distance){
            $('#catsitter_' + catsitter_id).hide();
        }
        else{
            $('#catsitter_' + catsitter_id).show();
        }
    }
});

$("#select_sort").change(function(){
    const selected_sort = $(this).val();
    console.log(selected_sort);

    if(selected_sort == 'distance'){
        fetch('./get_user_list/distance/')
        .then(e => e.json())
        .then(e => {
            console.log(e.catsitters);
            console.log(e.lat);
            console.log(e.lng);

            const catsitters = e.catsitters;
            const user_lat = e.lat;
            const user_lng = e.lng;

            for(var i=0;i<catsitters.length;i++){
                catsitters[i]['distance'] = distance(user_lat, user_lng, catsitters[i].user.lat, catsitters[i].user.lng, 'K');
            }

            catsitters.sort(function(a,b) {
                    return parseFloat(a.distance) - parseFloat(b.distance);
                }
            )

            for(var i=0;i<catsitters.length;i++){
                console.log(catsitters[i].name, catsitters[i]['distance']);
            }

            $(".content-catsitter-resultWrapper").html('');

            for(var catsitter of catsitters){
                const a = `<div class="content-catsitter-itemWrapper" id="catsitter_`
                
                const catsitter_id = catsitter.id;
                
                const a2 = `">
                <div class="content-catsitter-item-profileWrapper">
                    <div class="content-catsitter-item-profile-imageWrapper">
                        <img class="content-catsitter-item-profile_image" src="`
                        
                const catsitter_profile_image = catsitter.catsitter_profile_image;  
                        
                const a3 = `">
                    </div>
                    <div class="content-catsitter-item-profile-textWrapper">
                        <div class="content-catsitter-item-profile_text">`;

                const catsitter_name = catsitter.name;

                const b = `</div>
                </div>
            </div>
            <div class="content-catsitter-item-infoWrapper">
                <div class="content-catsitter-item-info-topWrapper">
                    <div class="stars-outer">
                        <div class="stars-inner" style="width: `
                        
                const catsitter_rate_per_hundred = catsitter.rate_per_hundred;
                        
                const b2 = `%;"></div>
                    </div>&nbsp;&nbsp;`;

                const catsitter_rate_per_five = catsitter.rate_per_five;

                const c = `<div class="content-catsitter-item-info-distanceWrapper">
                <div class="content-catsitter-item-info-distance_text"
                    data-catsitter-lat="`
                    
                const catsitter_lat = catsitter.user.lat;

                const c2 = `"data-catsitter-lng="`;

                const catsitter_lng = catsitter.user.lng;

                const c3 = `"data-catsitter-id="`
                
                const catsitter_distance_id = catsitter.id;

                const c4 = `">`;
                    
                const catsitter_distance = "~" + catsitter.distance + "km";

                const c5 = `</div>
                        </div>
                    </div>

                    <div class="content-catsitter-item-info-middleWrapper">
                        <div class="content-catsitter-item-info-middle-regionWrapper">
                            <div class="content-catsitter-item-info-middle_text">
                                <strong>`;

                const catsitter_available_region = catsitter.available_region;

                const d = `</strong> 에서 활동 중
                </div>
            </div>
            <div class="content-catsitter-item-info-middle-introduceWrapper">
                <div class="content-catsitter-item-info-middle_text">`;

                const catsitter_introduce = catsitter.introduce;

                const e = `</div>
                        </div>
                    </div>
                </div>
            </div>`;

                const result = a + catsitter_id + a2 + catsitter_profile_image + a3 +
                catsitter_name + 
                b + catsitter_rate_per_hundred + b2 +
                catsitter_rate_per_five + 
                c + catsitter_lat + c2 + catsitter_lng + c3 + catsitter_distance_id + c4 + catsitter_distance + c5 +
                catsitter_available_region + 
                d + 
                catsitter_introduce + 
                e;
                $(".content-catsitter-resultWrapper").append(result);
            }


            const lat = $("#sample3_address").data('lat');
            const lng = $("#sample3_address").data('lng');

            console.log(lat, lng);

            const selected_distance = $('#select_distance').val();
            console.log(selected_distance);

            let select_distance = 0;
            if(selected_distance == '5km'){
                select_distance = 5;
            }
            else if(selected_distance == '10km'){
                select_distance = 10;
            }
            else if(selected_distance == '20km'){
                select_distance = 20;
            }
            else if(selected_distance == 'all'){
                select_distance = 100000;
            }

            for(var catsitter of catsitters){
                const catsitter_lat = catsitter.user.lat;
                const catsitter_lng = catsitter.user.lng;
                const catsitter_id = catsitter.id;
                const catsitter_distance = distance(lat, lng, catsitter_lat, catsitter_lng, 'K');

                console.log(catsitter.name, catsitter.user.lat, catsitter.user.lng, parseFloat(catsitter_distance));
                //console.log(parseFloat(select_distance), parseFloat(catsitter_distance));
                if(parseFloat(select_distance) < parseFloat(catsitter_distance)){
                    console.log(parseFloat(select_distance), parseFloat(catsitter_distance));
                    $('#catsitter_' + catsitter_id).hide();
                }
                else{
                    $('#catsitter_' + catsitter_id).show();
                }
            }
        });
    }
    else if(selected_sort == 'rate'){
        fetch('./get_user_list/rate/')
        .then(e => e.json())
        .then(e => {
            console.log(e.catsitters);
            const catsitters = e.catsitters;
            const user_lat = e.lat;
            const user_lng = e.lng;

            for(var i=0;i<catsitters.length;i++){
                catsitters[i]['distance'] = distance(user_lat, user_lng, catsitters[i].user.lat, catsitters[i].user.lng, 'K');
            }

            for(var i=0;i<catsitters.length;i++){
                console.log(catsitters[i].name, catsitters[i].rate_per_five);
            }

            $(".content-catsitter-resultWrapper").html('');

            for(var catsitter of catsitters){
                const a = `<div class="content-catsitter-itemWrapper" id="catsitter_`
                
                const catsitter_id = catsitter.id;
                
                const a2 = `">
                <div class="content-catsitter-item-profileWrapper">
                    <div class="content-catsitter-item-profile-imageWrapper">
                        <img class="content-catsitter-item-profile_image" src="`
                        
                const catsitter_profile_image = catsitter.catsitter_profile_image;  
                        
                const a3 = `">
                    </div>
                    <div class="content-catsitter-item-profile-textWrapper">
                        <div class="content-catsitter-item-profile_text">`;

                const catsitter_name = catsitter.name;

                const b = `</div>
                </div>
            </div>
            <div class="content-catsitter-item-infoWrapper">
                <div class="content-catsitter-item-info-topWrapper">
                    <div class="stars-outer">
                        <div class="stars-inner" style="width: `
                        
                const catsitter_rate_per_hundred = catsitter.rate_per_hundred;
                        
                const b2 = `%;"></div>
                    </div>&nbsp;&nbsp;`;

                const catsitter_rate_per_five = catsitter.rate_per_five;

                const c = `<div class="content-catsitter-item-info-distanceWrapper">
                <div class="content-catsitter-item-info-distance_text"
                    data-catsitter-lat="`
                    
                const catsitter_lat = catsitter.user.lat;

                const c2 = `"data-catsitter-lng="`;

                const catsitter_lng = catsitter.user.lng;

                const c3 = `"data-catsitter-id="`
                
                const catsitter_distance_id = catsitter.id;

                const c4 = `">`;
                    
                const catsitter_distance = "~" + catsitter.distance + "km";

                const c5 = `</div>
                        </div>
                    </div>

                    <div class="content-catsitter-item-info-middleWrapper">
                        <div class="content-catsitter-item-info-middle-regionWrapper">
                            <div class="content-catsitter-item-info-middle_text">
                                <strong>`;

                const catsitter_available_region = catsitter.available_region;

                const d = `</strong> 에서 활동 중
                </div>
            </div>
            <div class="content-catsitter-item-info-middle-introduceWrapper">
                <div class="content-catsitter-item-info-middle_text">`;

                const catsitter_introduce = catsitter.introduce;

                const e = `</div>
                        </div>
                    </div>
                </div>
            </div>`;

                const result = a + catsitter_id + a2 + catsitter_profile_image + a3 +
                catsitter_name + 
                b + catsitter_rate_per_hundred + b2 +
                catsitter_rate_per_five + 
                c + catsitter_lat + c2 + catsitter_lng + c3 + catsitter_distance_id + c4 + catsitter_distance + c5 +
                catsitter_available_region + 
                d + 
                catsitter_introduce + 
                e;
                $(".content-catsitter-resultWrapper").append(result);
            }

            const lat = $("#sample3_address").data('lat');
            const lng = $("#sample3_address").data('lng');

            console.log(lat, lng);

            const selected_distance = $('#select_distance').val();
            console.log(selected_distance);

            let select_distance = 0;
            if(selected_distance == '5km'){
                select_distance = 5;
            }
            else if(selected_distance == '10km'){
                select_distance = 10;
            }
            else if(selected_distance == '20km'){
                select_distance = 20;
            }
            else if(selected_distance == 'all'){
                select_distance = 100000;
            }

            for(var catsitter of catsitters){
                const catsitter_lat = catsitter.user.lat;
                const catsitter_lng = catsitter.user.lng;
                const catsitter_id = catsitter.id;
                const catsitter_distance = distance(lat, lng, catsitter_lat, catsitter_lng, 'K');

                console.log(catsitter.name, catsitter.user.lat, catsitter.user.lng, parseFloat(catsitter_distance));
                //console.log(parseFloat(select_distance), parseFloat(catsitter_distance));
                if(parseFloat(select_distance) < parseFloat(catsitter_distance)){
                    console.log(parseFloat(select_distance), parseFloat(catsitter_distance));
                    $('#catsitter_' + catsitter_id).hide();
                }
                else{
                    $('#catsitter_' + catsitter_id).show();
                }
            }
        });
    }
});


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
            $("#sample3_detailAddress").val('');
            $("#sample3_extraAddress").val('');
            
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
                // document.getElementById("sample3_extraAddress").value = extraAddr;
            
            } else {
                // document.getElementById("sample3_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            // document.getElementById('sample3_postcode').value = data.zonecode;
            document.getElementById("sample3_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            // document.getElementById("sample3_detailAddress").focus();

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