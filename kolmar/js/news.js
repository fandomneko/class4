document.addEventListener('DOMContentLoaded', () => {
    const siteHeader = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuBtn');
    const gnb = document.getElementById('gnb');
    const megaMenu = document.getElementById('megaMenu');
    const megaMenuTitle = document.getElementById('megaMenuTitle');
    const megaMenuLinks = document.getElementById('megaMenuLinks');

    const menuContents = [
        { title: '사업 서비스', links: [['사업소개', 'business.html'], ['ODM', 'business.html'], ['사업장', 'business.html'], ['사업문의', 'business.html'], ['견적문의', 'business.html']] },
        { title: 'R&D', links: [['연구소 소개', 'rnd.html#lab'], ['연구분야', 'rnd.html#fields'], ['기술 경쟁력', 'rnd.html#technology']] },
        { title: '회사소개', links: [['회사개요', 'company.html#overview'], ['CEO 인사말', 'company.html#greeting'], ['연혁', 'company.html#history'], ['경영철학', 'company.html#philosophy']] },
        { title: 'ESG', links: [['ESG 경영', 'esg.html#esg-management'], ['환경경영', 'esg.html#environment'], ['윤리경영', 'esg.html#ethics'], ['사회공헌', 'esg.html#social']] },
        { title: '소식', links: [['콜마소식', '#kolmar-news'], ['보도자료', '#press'], ['공지사항', '#notice']] },
        { title: 'IR', links: [['IR자료', 'ir.html#ir-data'], ['재무정보', 'ir.html#financial'], ['공시정보', 'ir.html#disclosure']] }
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

    function openMegaMenu(index = 4) {
        renderMegaMenu(index);
        siteHeader.classList.add('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'false');
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', '전체 메뉴 닫기');
    }

    function closeMegaMenu() {
        siteHeader.classList.remove('is-menu-open');
        megaMenu.setAttribute('aria-hidden', 'true');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', '전체 메뉴 열기');
        gnb.querySelectorAll('a').forEach(link => link.classList.remove('is-active'));
    }

    gnb.querySelectorAll('a').forEach((link, index) => {
        link.addEventListener('mouseenter', () => openMegaMenu(index));
        link.addEventListener('focus', () => openMegaMenu(index));
    });

    siteHeader.addEventListener('mouseleave', () => {
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) closeMegaMenu();
    });
    siteHeader.addEventListener('focusout', event => {
        if (!siteHeader.contains(event.relatedTarget)) closeMegaMenu();
    });

    menuButton.addEventListener('click', () => {
        if (siteHeader.classList.contains('is-menu-open')) closeMegaMenu();
        else openMegaMenu(4);
    });
    megaMenuLinks.addEventListener('click', closeMegaMenu);

    const categoryLinks = [...document.querySelectorAll('.news-category-inner a')];
    const sections = ['kolmar-news', 'press', 'notice'].map(id => document.getElementById(id));

    function updateCurrentCategory() {
        let currentIndex = 0;
        sections.forEach((section, index) => {
            if (section && section.getBoundingClientRect().top <= 180) currentIndex = index;
        });
        categoryLinks.forEach((link, index) => {
            const isCurrent = index === currentIndex;
            link.classList.toggle('is-current', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    window.addEventListener('scroll', updateCurrentCategory, { passive: true });
    window.addEventListener('resize', updateCurrentCategory);
    updateCurrentCategory();
});