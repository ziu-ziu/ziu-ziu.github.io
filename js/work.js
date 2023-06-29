window.onload = function(){  
    //닫기
    document.getElementById('close').addEventListener('click', (e) => {
        window.history.back();
    })

    //스크롤이벤트
    window.addEventListener('scroll', () => {
        var currentY = window.scrollY;
        var elem = document.getElementById('scroll-event');
        var clientRectBg = elem.getBoundingClientRect();
        var abTop = clientRectBg.top + currentY - 100;
        if(currentY > abTop){
            document.getElementById('detail').classList.add("active");
        }else {
            document.getElementById('detail').classList.remove("active");
        }
    })
};