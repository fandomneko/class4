document.addEventListener('DOMContentLoaded', () => {
    // OMD 단계 슬라이드: Swiper로 반응형 카드 탐색 구현
    const processSwiper = new Swiper('.omd-process', {
        slidesPerView: 1.15,
        spaceBetween: 12,
        watchOverflow: true,
        pagination: {
            el: '.process-pagination',
            type: 'fraction'
        },
        navigation: {
            prevEl: '.process-prev',
            nextEl: '.process-next'
        },
        breakpoints: {
            600: { slidesPerView: 2, spaceBetween: 16 },
            900: { slidesPerView: 4, spaceBetween: 18 }
        }
    });

    // 메인 페이지와 동일한 헤더·메가 메뉴 동작
    const siteHeader = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuBtn');
    const gnb = document.getElementById('gnb');
    const megaMenu = document.getElementById('megaMenu');
    const megaMenuTitle = document.getElementById('megaMenuTitle');
    const megaMenuLinks = document.getElementById('megaMenuLinks');

    const menuContents = [
        {
            title: '사업 서비스',
            links: [
                ['OMD', '#omd'],
                ['사업소개', '#business-intro'],
                ['사업장', '#locations'],
                ['사업문의', '#contact'],
                ['견적문의', '#quote']
            ]
        },
        {
            title: 'R&D',
            links: [['연구소 소개', 'index.html#rnd'], ['연구 분야', 'index.html#rnd'], ['기술 경쟁력', 'index.html#rnd']]
        },
        {
            title: '회사소개',
            links: [['회사개요', 'index.html#company'], ['CEO 인사말', 'index.html#company'], ['연혁', 'index.html#company'], ['경영철학', 'index.html#company']]
        },
        {
            title: 'ESG',
            links: [['ESG 경영', 'index.html#esg'], ['환경경영', 'index.html#esg'], ['사회공헌', 'index.html#esg'], ['윤리경영', 'index.html#esg']]
        },
        {
            title: '소식',
            links: [['콜마소식', 'news.html#kolmar-news'], ['보도자료', 'news.html#press'], ['공지사항', 'news.html#notice']]
        },
        {
            title: 'IR',
            links: [['IR 자료', 'index.html#ir'], ['재무정보', 'index.html#ir'], ['공시정보', 'index.html#ir']]
        }
    ];

    function renderMegaMenu(index) {
        const item = menuContents[index];
        megaMenuTitle.textContent = item.title;
        megaMenuLinks.innerHTML = item.links.map(([label, href]) =>
            '<a href="' + href + '">' + label + '</a>'
        ).join('');
        megaMenuLinks.setAttribute('aria-label', item.title + ' 하위 메뉴');
        gnb.querySelectorAll('a').forEach((link, i) => {
            link.classList.toggle('is-active', i === index);
        });
    }

    function openMegaMenu(index = 0) {
        renderMegaMenu(index);
        siteHeader.classList.add('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'false');
        menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMegaMenu() {
        siteHeader.classList.remove('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'true');
        menuButton.setAttribute('aria-expanded', 'false');
        gnb.querySelectorAll('a').forEach(link => link.classList.remove('is-active'));
    }

    gnb.querySelectorAll('a').forEach((link, index) => {
        link.addEventListener('mouseenter', () => openMegaMenu(index));
        link.addEventListener('focus', () => openMegaMenu(index));
    });
    siteHeader.addEventListener('mouseleave', closeMegaMenu);
    siteHeader.addEventListener('focusout', event => {
        if (!siteHeader.contains(event.relatedTarget)) closeMegaMenu();
    });

    menuButton.addEventListener('click', () => {
        if (siteHeader.classList.contains('is-menu-open')) closeMegaMenu();
        else openMegaMenu(0);
    });

    // 메가 메뉴의 현재 페이지 링크 클릭 시 메뉴를 닫고 기본 앵커 이동
    megaMenuLinks.addEventListener('click', () => closeMegaMenu());
});
