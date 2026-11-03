document.addEventListener('DOMContentLoaded', () => {
    // 기술 경쟁력 카드는 Swiper로 동작합니다. 직접 슬라이드 로직을 만들지 않습니다.
    new Swiper('.tech-swiper', {
        slidesPerView: 1.15,
        spaceBetween: 12,
        watchOverflow: true,
        pagination: { el: '.tech-pagination', type: 'fraction' },
        navigation: { prevEl: '.tech-prev', nextEl: '.tech-next' },
        breakpoints: {
            600: { slidesPerView: 2, spaceBetween: 16 },
            900: { slidesPerView: 3, spaceBetween: 20 }
        }
    });

    const header = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuBtn');
    const gnb = document.getElementById('gnb');
    const megaMenu = document.getElementById('megaMenu');
    const title = document.getElementById('megaMenuTitle');
    const links = document.getElementById('megaMenuLinks');

    const menuItems = [
        { title: '사업 서비스', links: [['사업소개','business.html'],['OMD','business.html'],['사업장','business.html#locations'],['사업문의','business.html#contact'],['견적문의','business.html#quote']] },
        { title: 'R&D', links: [['연구소 소개','#lab'],['연구분야','#fields'],['기술 경쟁력','#technology']] },
        { title: '회사소개', links: [['회사개요','index.html#company'],['CEO 인사말','index.html#company'],['연혁','index.html#company'],['경영철학','index.html#company']] },
        { title: 'ESG', links: [['ESG 경영','index.html#esg'],['환경경영','index.html#esg'],['사회공헌','index.html#esg'],['윤리경영','index.html#esg']] },
        { title: '소식', links: [['콜마 소식','index.html#news'],['보도자료','index.html#news'],['공지사항','index.html#news']] },
        { title: 'IR', links: [['IR 자료','index.html#ir'],['재무정보','index.html#ir'],['공시정보','index.html#ir']] }
    ];

    function renderMenu(index) {
        const item = menuItems[index];
        title.textContent = item.title;
        links.innerHTML = item.links.map(([label, href]) => '<a href="' + href + '">' + label + '</a>').join('');
        links.setAttribute('aria-label', item.title + ' 하위 메뉴');
        gnb.querySelectorAll('a').forEach((link, i) => link.classList.toggle('is-active', i === index));
    }
    function openMenu(index = 1) {
        renderMenu(index);
        header.classList.add('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'false');
        menuButton.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
        header.classList.remove('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'true');
        menuButton.setAttribute('aria-expanded', 'false');
        gnb.querySelectorAll('a').forEach(link => link.classList.remove('is-active'));
    }

    gnb.querySelectorAll('a').forEach((link, index) => {
        link.addEventListener('mouseenter', () => openMenu(index));
        link.addEventListener('focus', () => openMenu(index));
    });
    header.addEventListener('mouseleave', closeMenu);
    header.addEventListener('focusout', event => {
        if (!header.contains(event.relatedTarget)) closeMenu();
    });
    menuButton.addEventListener('click', () => {
        if (header.classList.contains('is-menu-open')) closeMenu();
        else openMenu(1);
    });
    links.addEventListener('click', closeMenu);
});