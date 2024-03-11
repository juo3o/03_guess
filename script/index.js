$(document).ready(function(){

    //디바이스별 제이쿼리 적용
    let w_width;
    w_width = $(window).innerWidth();
    console.log(w_width);

    //브라우저 크기가 변하면 함수내용을 실행한다
    $(window).resize(function(){

        w_width = $(window).innerWidth();
        console.log(w_width);

        if(w_width>=1025){
            //pc일때만 hover 하면 서브 내려가고 올라감
            $('.navi > li ').mouseenter(function(){
                $('.h_wrap').stop().animate({'height':'114px'},300);
            });
            $('.navi > li').mouseleave(function(){
                $('.h_wrap').stop().animate({'height':'70px'},300);
            });

            //신상품 fadeIn
            $('.newitem_wrap ul li').click(function(){
                $('.hover_txt').fadeIn();
            });

        }else if((w_width>=768)&&(w_width<1024)){

        }else{
            // 모바일 토글메뉴 누르면 나타나기
            $('.h_icon .mtoggle img').click(function(){
                $('header nav').stop().fadeIn();
                $('header nav').css('overflow-y','hidden');
            });
            $('.close_btn').click(function(){
                $('header nav').stop().fadeOut();
            });

            // 모바일 서브 아코디언 실행하기
            $('.navi > li').click(function(){
                // alert('클릭');
                $(this).find('.sub').slideToggle();
                $('.navi > li').not($(this)).find('.sub').slideUp();
            });
        }
    }).resize();

    //메인배너 스크립트
    const l_btn = $('#m_left');                   //이전
    const r_btn = $('#m_right');                  //다음
    const con_btn = $('.pagination li');          //컨트롤버튼

    let slide_img = $('.swiper_wrapper > div');  //슬라이드이미지
    let i = $('.pagination li').index();       //인덱스값 = 0                 

    //서서히사라지는 함수
    function fade(){

    slide_img.eq(i).fadeOut();  //eq에 0담아서 이미지 숨기기
                    
        $('.pagination li').removeClass('on');  //컨트롤버튼서식 모두제거
        if(i==4){
            i=0;
        }else{
            i++;
        }
        $('.pagination li').eq(i).addClass('on'); //선택한 컨트롤버튼에 서식넣기
        slide_img.eq(i).stop().fadeIn();   //이미지 나타나게
    }

    // 매 3초마다 함수 반복호출
    let Timer = setInterval(fade,3000);

    //좌우버튼 클릭 시 슬라이드 호출
    function fade2(){
        slide_img.eq(i).fadeOut();
        if(i==0){
            i=4;
        }else{
            i--;
        }
        slide_img.eq(i).fadeIn();
    }

    //좌우버튼 클릭 시 해당하는 방향으로 슬라이드 이미지 나오게
    l_btn.click(function(){
        fade();
    });
    r_btn.click(function(){
        fade2();
    });

    //좌우버튼 클릭 시 3초 시간 제거
    $('.mbanner_btn li').hover(function(){
        clearInterval(Timer);
    }),function(){
        Timer = setInterval(fade, 3000);
    };

    //컨트롤버튼
    con_btn.click(function(){
        clearInterval(Timer); //기존 자동슬라이드 시간제거
        let idx = $(this).index();
        slide_img.stop().fadeOut();  //보이는이미지 숨기기
        $('.pagination li').removeClass('on');  //컨트롤버튼서식 모두제거
        $('.pagination li').eq(idx).addClass('on'); //선택한 컨트롤버튼에 서식넣기
        slide_img.eq(idx).stop().fadeIn();   //이미지 나타나게
        i = idx;   //i값 idx값 일치시켜 다음순서 제대로 나오게
    });

    // 컨트롤에 마우스오버시 기존슬라이드 멈추게
    con_btn.mouseenter(function(){
        clearInterval(Timer);
    });

    // 컨트롤에 마우스아웃시 기존슬라이드 다시실행
    con_btn.mouseleave(function(){
        Timer = setInterval(fade,3000);
    });

    //키워드랭킹

    //메인메뉴 변수선언
    const mnu = $('.rank_wrap > li > a');
    let e;

    //첫번째 서브는 항상 block하기
    $('.key1').css('display','block');

    //메뉴클릭 시 해당 서브 나오게
    mnu.click(function(){

    //아코디언 메뉴 만들기: 하나는 무조건 펼쳐지게
        $('.key_sub').slideUp(); // 모든서브 위로접고
        $(this).next().slideDown();  //클릭한 다음요소 아래로 내리기
    });

    // 랭킹순위 누르면 이미지 wrap 이동하기 : overflow :hidden
    $('.rank_wrap > li').click(function(){
        //인덱스값구해서 div
        e = $(this).index();
        console.log(e);  //0,1,2,3 순으로 확인
        e = -(e*$('.rank_grid').width());    //width값 가져오기
        console.log(e);  //0,-735,-1410,-2205,-2940 순으로 확인
        //슬라이드 목록에 대입
        $('.rank_grid').animate({'left':e},-500);  //-500초: 슬라이드 효과X
    });

    //이벤트슬라이드
    $('.event_img_wrap > div:last-child').insertBefore('.event_img_wrap > div:first-child');
    $('.event_img_wrap').css('margin-left','-100%');
    function moveLeft(){
        $('.event_img_wrap').animate({'margin-left':'-200%'},500,function(){
            $('.event_img_wrap > div:first-child').insertAfter('.event_img_wrap > div:last-child');
            $('.event_img_wrap').css('margin-left','-100%');
            //중간div제외 나머지 오퍼시티 0
            $('.event_img_wrap > div:nth-child(2)').css('opacity','100%');
            $('.event_img_wrap > div:nth-child(1)').css('opacity','50%');
            $('.event_img_wrap > div:nth-child(3)').css('opacity','50%');
            $('.event_img_wrap > div:nth-child(2)').find('.event_txt').css('top','70%');
            $('.event_img_wrap > div:nth-child(1)').find('.event_txt').css('top','100%');
            $('.event_img_wrap > div:nth-child(3)').find('.event_txt').css('top','100%');
        });
    }
    let Timer2 = setInterval(moveLeft,3000);
    function moveRight(){
        $('.event_img_wrap').animate({'margin-left':'0%'},500,function(){
            $('.event_img_wrap > div:last-child').insertBefore('.event_img_wrap > div:first-child');
            $('.event_img_wrap').css('margin-left','-100%');
            //중간div제외 나머지 오퍼시티 0
            $('.event_img_wrap > div:nth-child(2)').css('opacity','100%');
            $('.event_img_wrap > div:nth-child(1)').css('opacity','50%');
            $('.event_img_wrap > div:nth-child(3)').css('opacity','50%');
            $('.event_img_wrap > div:nth-child(2)').find('.event_txt').css('top','70%');
            $('.event_img_wrap > div:nth-child(1)').find('.event_txt').css('top','100%');
            $('.event_img_wrap > div:nth-child(3)').find('.event_txt').css('top','100%');
        });
    }
    const elbtn = $('.elbtn');
    const erbtn = $('.erbtn');
    elbtn.click(function(){
        clearInterval(Timer2);
        moveLeft();
    });
    erbtn.click(function(){
        clearInterval(Timer2);
        moveRight();
        Timer2 = setInterval(moveLeft, 3000);
    });
    $('.event_btn a').mouseout(function(){
        clearInterval(Timer2);
        Timer2 = setInterval(moveLeft, 3000);
    });

});