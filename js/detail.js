//스크롤이벤트
function scrollEvent(elem){
    window.addEventListener('scroll', function(){
    const target = document.getElementById(elem);
    const clientRect = target.getBoundingClientRect();
    const currentY = window.scrollY;
    const absouteTop = clientRect.top + currentY;
    
    if (absouteTop < currentY){
        document.getElementById('detail').classList.add("active");
    }else {
        document.getElementById('detail').classList.remove("active");
    }
})
}

//닫기
function close(elem){
    document.getElementById(elem).addEventListener('click', (e) => {
        window.history.back();
    })
}
