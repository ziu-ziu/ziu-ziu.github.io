window.onload = function(){
    let slideItems = document.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const maxSlide = slideItems.length; //슬라이드 개수

    let currentIdx = 0; //현재 슬라이드 변수 저장
    const speedTime = 500;

    //transition
    function moveEffect(value){
        slide.style.transition = `${value}s ease-out`;
    }

    //슬라이드 전체 width
    const slide = document.querySelector('.slide-wrap');
    let slideWidth = slide.clientWidth;


    //페이지네이션 생성
    const pagination = document.querySelector('.pagination');
    for (let i = 0; i < maxSlide; i++){
        if (i === 0){
            pagination.innerHTML += `<li class="active"></li>`
        } else {
            pagination.innerHTML += `<li></li>`
        };
    }

    //슬라이드 이동 시 현재 활성화된 pagination 변경
    function paginationActive(value){
        paginationItems.forEach((i) => {
            i.classList.remove('active');
        })
        paginationItems[value].classList.add('active');
    }

    //페이지네이션 클릭시 해당 슬라이드로 이동하기
    const paginationItems = document.querySelectorAll(".pagination > li");
    for (let i = 0; i < maxSlide; i++) {
        paginationItems[i].addEventListener('click', function(){
            const offset = slideWidth * (i + 1);
            slide.style.transform = `translateX(${-offset}px)`
            moveEffect(0.5);
            paginationActive(i);
            clearInterval(loopInterval);
        })
    }


    // 무한 슬라이드를 위해 start, end 슬라이드 복사하기
    const startSlide = slideItems[0];
    const endSlide = slideItems[slideItems.length - 1];

    // 엘리먼트 생성
    const startElem = document.createElement(startSlide.tagName);
    const endElem = document.createElement(endSlide.tagName);

    // 엘리먼트에 클래스 적용, 내용 복사 동일하게 하기
    endSlide.classList.forEach((c) => {
        endElem.classList.add(c)
    });
    endElem.innerHTML = endSlide.innerHTML;
    startSlide.classList.forEach((c) => {
        startElem.classList.add(c)
    });
    startElem.innerHTML = startSlide.innerHTML;

    // 각 복제한 엘리먼트를 각 위치에 추가하기
    slideItems[0].before(endElem);
    slideItems[slideItems.length - 1].after(startElem);

    //슬라이드 1번부터 보이게 위치 수정
    slideItems = document.querySelectorAll('.slide-item');
    slide.style.width = slideWidth * (maxSlide + 2) + 'px';
    slide.style.transform = `translateX(${-slideWidth}px)`


    //버튼에 클릭이벤트 추가
    prevBtn.addEventListener('click', prevMove);
    nextBtn.addEventListener('click', nextMove);

    function nextMove(event){
        // event.preventDefault();
        if(currentIdx <= maxSlide - 1){
            slide.style.transform = `translateX(${- (currentIdx + 2) * slideWidth}px)`
            moveEffect(0.5);
        } 
        //마지막 슬라이드일 때
        if(currentIdx == maxSlide - 1) {
            setTimeout(() => {
                //복사한 첫번째 이미지에서 진짜 첫번째 이미지로 이동
                slide.style.transform = `translateX(${-slideWidth}px)`
                moveEffect(0);
            }, speedTime)
            currentIdx = -1;
        }
        currentIdx++;
        //페이지네이션 슬라이드에 맞게 활성화
        paginationActive(currentIdx);
    }

    function prevMove(event){
        event.preventDefault();
        if(currentIdx >= 0){
            slide.style.transform = `translateX(${-currentIdx * slideWidth}px)`
            moveEffect(0.5);
        }
        //마지막 슬라이드일 때
        if(currentIdx == 0){
            setTimeout(() => {
                //복사한 마지막 이미지에서 진짜 마지막 이미지로 이동
                slide.style.transform = `translateX(${-slideWidth * maxSlide}px)`
                moveEffect(0);
            }, speedTime)
            currentIdx = maxSlide;
        }
        currentIdx--;
        //페이지네이션 슬라이드에 맞게 활성화
        paginationActive(currentIdx);
    }

    // 기본적으로 슬라이드 루프 시작하기
    let loopInterval = setInterval(() => {
        nextMove();
    }, 3000);
    
    // 슬라이드에 마우스가 올라간 경우 루프 멈추기
    slide.addEventListener("mouseover", () => {
        clearInterval(loopInterval);
    });

    // 슬라이드에서 마우스가 나온 경우 루프 재시작하기
    slide.addEventListener("mouseout", () => {
        loopInterval = setInterval(() => {
        nextMove();
        }, 3000);
    });


    // 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
    window.addEventListener("resize", () => {
        slideWidth = slide.clientWidth;
    });
};