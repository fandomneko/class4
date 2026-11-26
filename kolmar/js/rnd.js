document.addEventListener('DOMContentLoaded', () => {

    // HERO 화살표: 같은 페이지의 연구분야 카드 영역으로 이동한 뒤 카드 트랙을 한 장 넘깁니다.
    const fieldTrack = document.querySelector('.fields-section .field-grid');
    const fieldNext = document.querySelector('.rnd-hero-copy .hero-scroll');
    if (fieldTrack && fieldNext) {
        fieldNext.addEventListener('click', () => {
            const cards = fieldTrack.querySelectorAll('.field-card');
            if (!cards.length) return;

            const gap = parseFloat(getComputedStyle(fieldTrack).columnGap) || 0;
            const step = cards[0].getBoundingClientRect().width + gap;
            const maxScroll = fieldTrack.scrollWidth - fieldTrack.clientWidth;
            const nextLeft = fieldTrack.scrollLeft >= maxScroll - 8 ? 0 : fieldTrack.scrollLeft + step;

            // 카드가 화면에 보이도록 해당 섹션으로 이동합니다. 연구소 소개 영역으로는 이동하지 않습니다.
            document.querySelector('.fields-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
            window.setTimeout(() => {
                fieldTrack.scrollTo({ left: nextLeft, behavior: 'smooth' });
            }, 450);
        });
    }

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
        { title: '회사', links: ['회사개요', 'CEO 인사말', '연혁', '경영철학'], href: 'index.html#company' },
        { title: 'ESG', links: ['ESG 경영', '환경경영', '사회공헌', '윤리경영'], href: 'index.html#esg' },
        { title: '소식', links: ['콜마소식', '보도자료', '공지사항'], href: 'news.html' },
        { title: 'IR', links: ['IR자료', '재무정보', '공시정보'], href: 'ir.html' }
    ];

    function renderMegaMenu(index) {
        const item = menuContents[index];
        megaMenuTitle.textContent = item.title;
        megaMenuLinks.innerHTML = item.links.map((label, linkIndex) => {
            const rndAnchors = ['#lab', '#fields', '#technology'];
            const irAnchors = ['ir.html#ir-data', 'ir.html#financial', 'ir.html#disclosure'];
            const href = index === 1 ? rndAnchors[linkIndex] : (index === 5 ? irAnchors[linkIndex] : item.href);
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