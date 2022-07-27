window.onload = function(){  
    //sns list   
    let snsData = [
        {name: 'Instagram', link: 'https://www.instagram.com/pie.glow/'},
        {name: 'Blog', link: 'https://blog.naver.com/songhee3'},
        {name: 'Youtube', link: 'https://www.youtube.com/channel/UCktjZVX7XhBzHztMiBR7znQ'},
    ];
    snsData.forEach((a,i) => {
        const temp = document.createElement('li');
        temp.innerHTML = `<a href='${snsData[i].link}' target='_blank'>${snsData[i].name}</a>`;
        document.getElementById('sns').append(temp);
    })

    //project list
    let projectMain = [
        {title:'페스타 셔틀버스 앱 표준화', subTitle:'2022 / Mobile App', thumb:'01_festa.png', link:'./work/Festa-Standardization.html', target:'', class:'uiux main', cate:'uiux'},
        {title:'무료디자인 리소스 사이트', subTitle:'2022 / Personal Project', thumb:'04_free.png', link:'https://pie-glow.github.io/', target:'_blank', class:'uiux', cate:'uiux'},
        {title:'FACTORY TALK LOGO PROPOSAL', subTitle:'2021 / Logo', thumb:'07_factallk.jpg', link:'./work/factalk.html', target:'', class:'branding main', cate:'branding'},
        {title:'The City Night', subTitle:'2021 / Artwork', thumb:'03_the_city_night.jpg', link:'javascript:void(0)', target:'', class:'etc modal', modal:'true', cate:'etc',},
        {title:'Shooting star', subTitle:'2021 / Artwork', thumb:'02_shooting_star.jpg', link:'javascript:void(0)', target:'', class:'etc modal', modal:'true', cate:'etc',},
        {title:'쉐정 2020 설 선물세트 패키지 디자인', subTitle:'2020 / Package', thumb:'10_cj20package.jpg', link:'./work/cj2020.html', target:'', class:'package main', cate:'package'},
        {title:'GGAC 레퍼토리시즌 2020', subTitle:'2019 / Website', thumb:'05_ggac.jpg', link:'https://ziu-ziu.github.io/GGAC2022/', target:'_blank', class:'uiux', cate:'uiux'},
        {title:'쉐정 2019 추석 선물세트 디자인', subTitle:'2019 / Package', thumb:'09_cj19package.jpg', link:'./work/cj2019.html', target:'', class:'package', cate:'package'},
        {title:'도시재생실증연구단 홍보 리플렛&부스', subTitle:'2015-2017 / Leaflet, Booth', thumb:'06_kourc.jpg', link:'./work/KOURC.html', target:'', class:'editorial', cate:'editorial'},
        {title:'MK코퍼레이션 트로이필 키트 패키지', subTitle:'2013 / Package', thumb:'08_troipeel.jpg', link:'./work/troipeel.html', target:'', class:'package', cate:'package'},
    ];
    function projectFilter(e){
        e.forEach((a,i) => {
            const temp = document.createElement('div');
            temp.className = 'workitem ';
            temp.className += `${e[i].class}`;
            temp.innerHTML = `<a href="${e[i].link}" target="${e[i].target}">
                                <div class="thumb" style="background:url('./img/01_thumb/${e[i].thumb}') no-repeat center center/cover"></div>
                                <div class="title">
                                <h4>${e[i].title}</h4>
                                <p>${e[i].subTitle}p</p>
                                </div>
                              </a>`
            document.getElementById('proj').append(temp);
        })
        //모달 열기
        var modal = document.querySelectorAll('.modal');
        modal.forEach(function(e){
            e.addEventListener('click', openModal);
        })
    };
    projectFilter(projectMain); //전체 리스트

    //work tab
    var tablinks = document.querySelectorAll('.tablinks');
    var resetTarget = document.getElementById('proj');
    function filtering(e){
        var project = projectMain.filter(project => project.cate == e);
        projectFilter(project);
    }
    function tabClick(e){
        //카테고리
        var btnTarget = e.currentTarget;
        tablinks.forEach(function(e){
            e.classList.remove('active');
        })
        btnTarget.classList.add('active');
        //내용
        resetTarget.innerHTML = '';
        var filter = e.target.dataset.cate;
        if(filter != 'all'){
            filtering(filter);
        }else {
            projectFilter(projectMain);
        }
    }
    //클릭이벤트
    tablinks.forEach(function(e){
        e.addEventListener('click', tabClick);
    })
    //파라미터
    let categorys = ['all','uiux','editorial','branding','package','etc'];
    window.addEventListener('hashchange', function(){
        for(var i in categorys){
            if(location.hash == `#${categorys[i]}`){
                tablinks.forEach(function(e){
                    e.classList.remove('active');
                })
                tablinks[i].classList.add('active');
                resetTarget.innerHTML = '';
                filtering(categorys[i]);
            }else if(location.hash == '#all'){
                resetTarget.innerHTML = '';
                projectFilter(projectMain);
            }
        }
    })
    if(location.hash == '#all'){
        tablinks[0].classList.add('active');
    }else {
        for(var i in categorys){
            if(location.hash == `#${categorys[i]}`){
                toggleClass(tablinks[i], 'active');
                resetTarget.innerHTML = '';
                filtering(categorys[i]);
            }
        }
    }

    //이미지 모달
    const body = document.querySelector('body');
    var scrollPosition = 0;
    function openModal(e){
        document.getElementById('modal').innerHTML = '';
        var modalTarget = e.currentTarget;
        var title = modalTarget.querySelector('h4').innerText;
        var imgUrl = modalTarget.querySelector('.thumb').style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1')
        const temp = document.createElement('div');
        temp.className = 'modal-inner';
        temp.innerHTML = `<div class="bg"></div>
                          <div class="modal-wrap">
                              <div class="img"><img src="${imgUrl}" alt="${title}"></div>
                          </div>
                          </div>`
        document.getElementById('modal').append(temp);
        scrollPosition = window.pageYOffset;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollPosition}px`;
        body.style.width = '100vw';
        //모달 닫기
        var modalInner = document.querySelector('.modal-inner');
        modalInner.addEventListener('click', function(){
            modalInner.classList.add('close');
            body.style.removeProperty('overflow');
            body.style.removeProperty('position');
            body.style.removeProperty('top');
            body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        })
    }





    //toggleClass
    function toggleClass(element, className) {
        var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
        if (check.test(element.className)) {
            element.className = element.className.replace(check, " ").trim();
        } else {
            element.className += " " + className;
        }
    }
};

