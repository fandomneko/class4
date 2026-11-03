document.addEventListener('DOMContentLoaded', () => {
    const siteHeader = document.getElementById('siteHeader');
    const menuButton = document.getElementById('menuBtn');
    const gnb = document.getElementById('gnb');
    const megaMenu = document.getElementById('megaMenu');
    const megaMenuTitle = document.getElementById('megaMenuTitle');
    const megaMenuLinks = document.getElementById('megaMenuLinks');

    // 메인 페이지와 같은 메뉴 구성과 활성 상태를 사용합니다.
    const menuContents = [
        { title: '사업 서비스', links: ['사업소개', 'ODM', '사업장', '사업문의', '견적문의'], href: 'business.html' },
        { title: 'R&D', links: ['연구소 소개', '연구분야', '기술 경쟁력'], href: 'rnd.html' },
        { title: '회사소개', links: ['회사개요', 'CEO 인사말', '연혁', '경영철학'], href: 'index.html#company' },
        { title: 'ESG', links: ['ESG 경영', '환경경영', '사회공헌', '윤리경영'], href: 'index.html#esg' },
        { title: '소식', links: ['콜마소식', '보도자료', '공지사항'], href: 'news.html' },
        { title: 'IR', links: ['IR자료', '재무정보', '공시정보'], href: 'ir.html' }
    ];

    function renderMegaMenu(index) {
        const item = menuContents[index];
        megaMenuTitle.textContent = item.title;
        megaMenuLinks.innerHTML = item.links.map((label, linkIndex) => {
            const rndAnchors = ['#lab', '#fields', '#technology'];
            const href = index === 1 ? rndAnchors[linkIndex] : item.href;
            return '<a href="' + href + '">' + label + '</a>';
        }).join('');
        megaMenuLinks.setAttribute('aria-label', item.title + ' 하위 메뉴');
        gnb.querySelectorAll('a').forEach((link, i) => {
            link.classList.toggle('is-active', i === index);
        });
    }

    function openMegaMenu(index = 1) {
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
        else openMegaMenu(1);
    });

    megaMenuLinks.addEventListener('click', closeMegaMenu);
});