document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    // 스크롤 방향에 따라 헤더 표시/숨김
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        if (currentScrollY <= 80) {
            header.classList.remove('is-hidden');
        } else if (header.classList.contains('is-menu-open')) {
            header.classList.remove('is-hidden');
        } else if (delta > 6) {
            header.classList.add('is-hidden');
        } else if (delta < -6) {
            header.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // 메가 메뉴의 이미지 박스를 메뉴 항목별 대표 이미지로 전환
    const menuImage = document.querySelector('.mega-menu-visual img');
    const gnb = document.getElementById('gnb');
    if (menuImage && gnb) {
        const images = [
            { src: 'img/%ED%94%BC%ED%8E%AB%EA%B3%BC%20%EC%9C%A0%EB%A6%AC%20%EB%B0%94%EC%9D%B4%EC%95%8C%EC%9D%98%20%EC%8B%A4%ED%97%98%EC%8B%A4%20%EC%9E%A5%EB%A9%B4.png?v=20261105-hero', alt: '한국콜마 사업 대표 이미지' },
            { src: 'img/service_visual_img02.jpg?v=20261106-jpg', alt: '한국콜마 연구개발 이미지' },
            { src: 'img/481.jpg', alt: '한국콜마 기업 이미지' },
            { src: 'img/sub0.jpg', alt: '한국콜마 ESG 이미지' },
            { src: 'img/rp1.jpg', alt: '한국콜마 소식 이미지' },
            { src: 'img/i1_3.gif', alt: '한국콜마 투자정보 이미지' }
        ];

        const changeMenuImage = index => {
            const item = images[index];
            if (!item) return;
            menuImage.src = item.src;
            menuImage.alt = item.alt;
        };

        gnb.querySelectorAll('a').forEach((link, index) => {
            link.addEventListener('mouseenter', () => changeMenuImage(index));
            link.addEventListener('focus', () => changeMenuImage(index));
        });
    }
});
