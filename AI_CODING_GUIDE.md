# AI_CODING_GUIDE.md

## 1. 문서 목적

이 문서는 현재 프로젝트의 **버거킹 로그인 UI 코드**를 기준으로, 다른 브랜드의 로그인 화면을 만들 때 기존 코드의 구조와 작성 방식을 최대한 유지하기 위한 가이드이다.

새로운 화면을 만들 때 처음부터 완전히 다른 코드를 작성하는 것이 아니라,

> 기존 HTML 구조 + 기존 CSS 작성 방식 + 기존 반응형/접근성 방식 + 브랜드별 디자인 변경

을 기본 원칙으로 한다.

이 문서는 AI가 새로운 로그인 UI를 만들거나 기존 코드를 수정할 때 참고하는 기준으로 사용한다.

---

## 2. 현재 기준 코드

현재 기준으로 사용하는 버거킹 로그인 화면은 다음 파일이다.

- `burgerking/login.html`
- `css/default.css`
- `font/css/` 안의 폰트 CSS
- `burgerking/img/` 안의 로그인 관련 이미지

### 현재 파일 역할

#### `burgerking/login.html`

로그인 화면의 HTML 구조와 페이지별 CSS가 들어 있다.

현재 페이지별 CSS는 HTML 내부의 `<style>`에 작성되어 있다.

#### `css/default.css`

프로젝트 전체에서 사용하는 공통 초기화 및 기본 스타일을 관리한다.

주요 내용:

- `box-sizing`
- margin / padding 초기화
- body 기본 설정
- 링크 초기화
- 이미지 기본 설정
- form 요소 초기화
- focus 상태
- `.sr-only`
- 모바일 터치 관련 설정
- 접근성 관련 설정

#### `font/css/`

로그인 화면에서 사용하는 폰트 CSS가 들어 있다.

#### `burgerking/img/`

뒤로가기, 비밀번호 보기, 체크박스, SNS 로그인 등의 아이콘이 들어 있다.

---

## 3. 기존 HTML 구조를 기본으로 유지한다

현재 버거킹 로그인 화면의 기본 구조는 다음과 같다.

```html
<body>
    <div id="wrap">
        <header>
            <h1>로그인</h1>
            <button class="prev_btn">
                <span class="sr-only">이전버튼</span>
            </button>
        </header>

        <main>
            <h2 class="title">
                <span>안녕하세요 :)</span>
                <span>버거킹입니다.</span>
            </h2>

            <form action="">
                <fieldset>
                    <legend class="sr-only">로그인 화면</legend>

                    <!-- 로그인 입력 영역 -->
                </fieldset>
            </form>

            <div class="login_link">
                <!-- 아이디 찾기 / 비밀번호 재설정 / 회원가입 -->
            </div>

            <div class="sns_login">
                <p>SNS으로 간편하게 로그인</p>

                <div class="sns_list">
                    <!-- SNS 로그인 버튼 -->
                </div>
            </div>
        </main>
    </div>
</body>
```

새 브랜드 화면을 만들 때 위 구조를 우선 유지한다.

브랜드의 콘텐츠나 기능 때문에 반드시 변경해야 하는 경우에만 구조를 변경한다.

---

## 4. HTML 작성 원칙

현재 코드에서 사용하는 의미 있는 HTML 요소를 유지한다.

- `header` : 상단 영역
- `main` : 주요 콘텐츠
- `form` : 로그인 입력 영역
- `fieldset` : 로그인 입력 요소 그룹
- `legend` : 입력 그룹 설명
- `label` : 입력 요소 설명
- `button` : 동작 실행
- `a` : 페이지 이동
- `h1`, `h2` : 제목 계층

단순히 화면을 만들기 위해 모든 요소를 `div`로 변경하지 않는다.

### 기존 클래스도 우선 유지한다

다음과 같은 기존 클래스는 새 화면에서도 가능한 한 유지한다.

- `#wrap`
- `.prev_btn`
- `.title`
- `.input_box`
- `.rela`
- `.pw_btn`
- `.login_option`
- `.check`
- `.login_btn`
- `.login_link`
- `.sns_login`
- `.sns_list`
- `.sr-only`

클래스명을 변경해야 한다면 변경 이유를 먼저 확인한다.

---

## 5. `default.css`와 페이지 CSS를 구분한다

현재 프로젝트는 공통 스타일과 페이지별 스타일을 구분한다.

### `default.css`에 있는 공통 기능

- 전체 초기화
- 기본 폰트 관련 설정
- 링크 초기화
- form 요소 초기화
- 이미지 기본 설정
- `:focus-visible`
- `.sr-only`
- 반응형/모바일 기본 설정
- 접근성 관련 설정

### `login.html`의 `<style>`에 있는 페이지 스타일

- 로그인 화면의 색상
- 로그인 화면의 레이아웃
- 제목 크기
- 입력창
- 비밀번호 버튼
- 로그인 옵션
- 로그인 버튼
- 로그인 관련 링크
- SNS 로그인 영역

새 화면을 만들 때 `default.css`를 필요 이상으로 수정하지 않는다.

페이지에만 필요한 스타일이라면 기존 방식처럼 페이지의 `<style>` 영역에서 처리하는 것을 우선한다.

---

## 6. CSS 변수 구조를 유지한다

버거킹 로그인 화면에서는 `:root`에서 주요 디자인 값을 변수로 관리한다.

현재 기준:

```css
:root {
    --font: "Sadoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;
    --primary: #512314;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --inputBg: #FFFCF9;
    --errorColor: #C54734;
    --placeholder: #EBE6E2;
    --text: #766053;
    --bg: #F4EBDC;
    --button: #E9DDCD;
}
```

새 브랜드를 만들 때도 이처럼 반복되는 디자인 값을 CSS 변수로 관리하는 방식을 우선한다.

예를 들어 브랜드 색상이 달라진다면:

```css
:root {
    --primary: 새로운 브랜드의 주요 색상;
    --bg: 새로운 배경 색상;
}
```

처럼 기존 구조를 활용한다.

---

## 7. 전체 페이지 구조

현재 `#wrap`은 로그인 페이지 전체를 감싸는 컨테이너이다.

```css
#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvh;
    margin: 0 auto;
    background-color: var(--bg);
}
```

새 화면에서도 `#wrap`을 기본 페이지 컨테이너로 유지한다.

특별한 이유 없이 새로운 최상위 컨테이너를 만들지 않는다.

---

## 8. Header 구조

현재 header는 제목을 가운데 배치하고 이전 버튼을 왼쪽에 배치한다.

```html
<header>
    <h1>로그인</h1>
    <button class="prev_btn">
        <span class="sr-only">이전버튼</span>
    </button>
</header>
```

CSS에서는 `header`에 `position: relative`와 flex를 사용하고, `.prev_btn`은 `position: absolute`로 배치한다.

새 브랜드에서도 기본 구조와 배치 방법을 유지한다.

브랜드에 따라 뒤로가기 아이콘이나 색상만 변경할 수 있다.

---

## 9. Main 영역과 콘텐츠 순서

현재 로그인 화면의 주요 콘텐츠 순서는 다음과 같다.

1. 로그인 페이지 제목
2. 이메일 입력
3. 비밀번호 입력
4. 로그인 옵션
5. 로그인 버튼
6. 아이디 찾기 / 비밀번호 재설정 / 회원가입
7. SNS 간편 로그인

이 순서는 사용자가 로그인 정보를 입력하고 로그인한 뒤 필요한 보조 기능과 다른 로그인 방법을 확인하는 흐름으로 구성되어 있다.

새 브랜드에서도 특별한 이유가 없다면 이 콘텐츠 순서를 유지한다.

---

## 10. 폰트 연결

현재 `login.html`에서는 다음과 같이 폰트 CSS를 외부 연결한다.

```html
<link rel="stylesheet" href="../font/css/bkbulmatpro_bold.css">
<link rel="stylesheet" href="../font/css/sdgothicneo.css">
<link rel="stylesheet" href="../font/css/pretendardvariable.css">
```

새 화면에서도 먼저 프로젝트 안에 이미 사용할 수 있는 폰트가 있는지 확인한다.

새 폰트를 추가해야 한다면 다음을 확인한다.

1. 실제 폰트 파일이 있는가?
2. 폰트 CSS가 있는가?
3. 상대경로가 올바른가?
4. `font-family` 이름이 실제 CSS와 일치하는가?

실제 파일을 확인하지 않고 폰트 경로를 추측하지 않는다.

---

## 11. `html`과 `body`의 기본 스타일

현재 로그인 페이지에서는 다음과 같은 기본 글자 설정을 사용한다.

```css
html {
    font-size: 62.5%;
}

body {
    font-family: var(--font);
    font-size: 1.6rem;
    color: var(--primary);
}
```

새 화면에서도 기존의 단위와 작성 방식을 우선 유지한다.

특별한 이유가 없다면 기존의 `rem` 기반 크기 체계를 갑자기 `px` 중심으로 변경하지 않는다.

---

## 12. Main 여백

현재 main은 다음과 같이 작성되어 있다.

```css
main {
    padding: 48px 20px 90px;
}
```

새 화면에서도 전체적인 좌우 여백과 상하 여백의 구조를 우선 유지한다.

브랜드 디자인 때문에 간격을 변경해야 할 경우 필요한 값만 수정한다.

---

## 13. 제목 영역

현재 `.title`은 두 줄의 텍스트를 세로로 배치한다.

```css
.title {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 50px;
    font-family: var(--font-BKR);
}
```

브랜드가 변경되면 문구와 폰트는 변경할 수 있지만, 제목을 세로로 배치하는 기존 구조는 먼저 유지할 수 있는지 확인한다.

---

## 14. Input 구조와 스타일

현재 이메일과 비밀번호 입력창은 다음과 같은 선택자를 사용한다.

```css
input[type="email"],
input[type="password"] {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-radius: 10px;
}
```

기본 입력 스타일은 다음과 같다.

```css
input {
    border: 1px solid var(--baseBorder);
    background: var(--inputBg);
}

input::placeholder {
    color: var(--placeholder);
}
```

새 브랜드에서는 다음 항목을 브랜드에 맞게 조정할 수 있다.

- border 색상
- background 색상
- placeholder 색상
- border-radius
- 높이
- padding

단, 입력창의 기본 구조와 너비를 먼저 유지한다.

### CSS 선택자 주의

현재 코드에는 다음 선택자도 존재한다.

```css
input[type=".email"]
```

하지만 실제 HTML의 이메일 input은:

```html
<input type="email">
```

이다.

따라서 `type` 속성을 선택할 때는 HTML의 실제 값과 CSS 선택자가 정확히 일치해야 한다.

정확한 선택자는:

```css
input[type="email"]
```

이다.

기존 코드에서 이런 부분을 발견했을 때는 무조건 전체 CSS를 다시 작성하지 말고 해당 선택자만 먼저 확인한다.

---

## 15. 비밀번호 입력과 Eye 버튼

현재 비밀번호 영역은 `.input_box.rela`를 사용한다.

```css
.input_box.rela {
    position: relative;
}
```

비밀번호 보기 버튼은 내부에서 절대 위치로 배치한다.

```css
.pw_btn {
    position: absolute;
    right: 20px;
    bottom: 12px;
    width: 26px;
    height: 26px;
    background: url(img/eye_icon.svg)
        no-repeat center / 26px;
}
```

새 브랜드에서도 비밀번호 버튼이 필요하다면 이 구조를 우선 사용한다.

아이콘 파일은 실제 `img` 폴더를 확인한 후 연결한다.

---

## 16. Login Option / Checkbox

현재 로그인 옵션은 `label` 안에 실제 checkbox와 텍스트 `span`을 넣는 구조이다.

```html
<label>
    <input type="checkbox" class="check sr-only" checked>
    <span>자동로그인</span>
</label>
```

화면에 표시되는 체크박스 모양은 `span::before`와 background-image를 이용한다.

```css
.login_option .check + span::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(img/checkBox_disabled.svg)
        no-repeat center / contain;
}

.login_option .check:checked + span:before {
    background-image: url(img/checkBox_active.svg);
}
```

새 화면에서도 실제 checkbox의 기능은 유지하고, 브랜드별 아이콘만 변경할 수 있다.

---

## 17. Login Button

현재 로그인 버튼은 전체 너비를 사용한다.

```css
.login_btn {
    width: 100%;
    height: 44px;
    border-radius: 22px;
    font-family: inherit;
    font-size: inherit;
    color: var(--placeholder);
    background-color: var(--primary);
    border: none;
    opacity: 0.2;
}
```

새 브랜드에서도 다음 기본 구조를 유지한다.

- `width: 100%`
- `height: 44px`
- `border-radius`
- `font-family: inherit`
- `font-size: inherit`
- 브랜드 주요 색상 사용

로그인 버튼의 디자인을 변경할 때는 기존 구조를 먼저 유지하고 색상, radius 등의 필요한 값만 변경한다.

---

## 18. 로그인 관련 링크

현재 로그인 관련 링크는 `.login_link` 안에 배치한다.

```html
<div class="login_link">
    <a href="#">아이디 찾기</a>
    <a href="#">비밀번호 재설정</a>
    <a href="#">회원가입</a>
</div>
```

각 링크 사이의 구분선은 `::after`로 만든다.

```css
.login_link a::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 12px;
    background-color: var(--primary);
    opacity: 0.5;
}
```

마지막 링크에는 구분선을 표시하지 않는다.

새 브랜드에서도 동일한 구조를 우선 사용한다.

---

## 19. SNS 로그인 영역

현재 SNS 로그인 영역은 다음과 같은 구조이다.

```html
<div class="sns_login">
    <p>SNS으로 간편하게 로그인</p>

    <div class="sns_list">
        <a href="#">
            <span class="sr-only">카카오로그인</span>
        </a>
        <a href="#">
            <span class="sr-only">네이버로그인</span>
        </a>
        <a href="#">
            <span class="sr-only">애플로그인</span>
        </a>
        <a href="#">
            <span class="sr-only">삼성카드로그인</span>
        </a>
    </div>
</div>
```

SNS 아이콘은 `.sns_list > a`의 background-image로 표시한다.

```css
.sns_list > a {
    display: block;
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 45px;
}
```

새 브랜드에서 SNS 종류가 달라진다면 실제 사용하는 아이콘 파일을 확인한 후 변경한다.

---

## 20. 접근성

현재 프로젝트에서는 `.sr-only`를 이용하여 화면에는 보이지 않지만 스크린리더가 읽을 수 있는 텍스트를 제공한다.

예:

```html
<button class="prev_btn">
    <span class="sr-only">이전버튼</span>
</button>
```

SNS 아이콘에도 같은 방식을 사용한다.

```html
<a href="#">
    <span class="sr-only">카카오로그인</span>
</a>
```

아이콘만 보이는 버튼이나 링크를 만들 때 의미를 알 수 있는 텍스트를 제공한다.

기존 `default.css`의 `.sr-only`를 우선 사용한다.

---

## 21. 이미지 경로

현재 `login.html`은 `burgerking` 폴더 안에 있으므로 이미지 경로를 다음처럼 작성한다.

```css
background: url(img/back_icon.svg);
```

새 브랜드 화면을 만들 때도 현재 HTML 파일의 위치를 기준으로 상대경로를 작성한다.

경로를 임의로 추측하지 않는다.

확인할 것:

1. HTML 파일 위치
2. 이미지 폴더 위치
3. 실제 파일명
4. 확장자
5. 상대경로

---

## 22. 주석 작성 방식

현재 코드에는 단순한 설명뿐 아니라 학습을 위한 주석이 포함되어 있다.

예:

```css
/* input요소는 기본적으로 inline-block속성을 가짐*/
```

```css
/* button요소는 기본적으로 상속이 불가하여 상속에 관련된 값을 따로 넣어야 함*/
```

새 코드를 작성할 때도 코드의 이유를 이해하는 데 도움이 되는 경우 주석을 남긴다.

특히 다음은 주석을 고려한다.

- 왜 특정 속성을 사용하는지
- 왜 특정 요소를 절대 위치로 배치하는지
- 왜 `inherit`를 사용하는지
- 기존 구조를 유지해야 하는 이유
- 처음 배우는 CSS 속성

단, 모든 코드에 주석을 붙이지 않는다.

---

## 23. 반응형 기준

현재 `default.css`에는 다음과 같은 반응형/모바일 대응 설정이 있다.

- `box-sizing: border-box`
- `max-width`
- `min-width`
- `100dvh`
- `overflow-x: hidden`
- `-webkit-appearance`
- `touch-action`
- `prefers-reduced-motion`

새 화면을 만들 때 이 공통 설정을 무시하고 별도의 복잡한 반응형 시스템을 만들지 않는다.

브라우저에서 최소한 다음 화면을 확인한다.

- 모바일
- 태블릿
- 데스크톱

확인할 문제:

- 가로 스크롤
- 입력창 잘림
- 버튼 잘림
- 텍스트 겹침
- SNS 아이콘 영역 이탈
- 과도한 여백

---

## 24. JavaScript 사용 원칙

현재 버거킹 로그인 HTML에서 기본 UI 구조는 HTML과 CSS로 구성되어 있다.

JavaScript는 필요한 인터랙션에만 사용한다.

예:

- 비밀번호 보기 / 숨기기
- 로그인 버튼 상태 변경
- 입력값 확인
- 체크박스와 관련된 동작

HTML과 CSS로 해결할 수 있는 문제를 불필요하게 JavaScript로 만들지 않는다.

새로운 라이브러리나 프레임워크를 임의로 추가하지 않는다.

---

## 25. 새 브랜드 화면을 만드는 작업 순서

### STEP 1. 기존 코드 확인

먼저 다음을 확인한다.

- `burgerking/login.html`
- `css/default.css`
- `font/css/`
- `burgerking/img/`
- 필요한 JavaScript

### STEP 2. 유지할 구조 확인

우선 다음을 유지한다.

- `#wrap`
- `header`
- `main`
- `form`
- `fieldset`
- `legend`
- 기존 클래스 구조
- `.sr-only`
- CSS 변수 방식
- 기존 반응형 방식

### STEP 3. 브랜드 변경점 정리

브랜드에 따라 다음을 변경한다.

- 브랜드명
- 문구
- 로고
- 주요 색상
- 배경색
- 폰트
- 입력창 스타일
- 로그인 버튼
- 아이콘
- SNS 로그인 종류

### STEP 4. HTML 변경

기존 구조를 유지하면서 콘텐츠만 브랜드에 맞게 변경한다.

### STEP 5. CSS 변경

기존 선택자와 CSS 작성 방식을 유지하면서 필요한 디자인 값만 변경한다.

### STEP 6. 이미지 연결

실제 이미지 파일과 경로를 확인한 후 연결한다.

### STEP 7. 테스트

브라우저에서 다음을 확인한다.

- 레이아웃
- 폰트
- 색상
- 입력창
- 버튼
- 체크박스
- 비밀번호 버튼
- 링크
- SNS 아이콘
- 모바일 화면
- 가로 스크롤

---

## 26. AI가 코드를 수정할 때의 원칙

AI는 기존 코드를 확인하지 않고 처음부터 전체 코드를 새로 작성하지 않는다.

### 하지 말아야 할 것

- 기존 HTML 구조를 필요 이상으로 변경
- 기존 클래스명을 이유 없이 변경
- 기존 CSS를 전부 삭제하고 다시 작성
- 새로운 프레임워크를 임의로 추가
- 새로운 라이브러리를 임의로 추가
- 실제 파일 구조를 확인하지 않고 경로 작성
- 존재하지 않는 이미지 파일을 임의로 사용
- 브랜드 디자인을 근거 없이 추측
- 오류 원인을 확인하지 않고 완성 코드부터 제시

### 우선 해야 할 것

1. 기존 코드 확인
2. 문제 위치 확인
3. 기존 구조에서 해결 가능한지 확인
4. 필요한 부분만 수정
5. 수정 이유 설명
6. 브라우저에서 테스트

---

## 27. 오류가 발생했을 때 확인 순서

화면이 예상과 다르게 나오면 다음 순서로 확인한다.

### 1. HTML

요소가 실제로 존재하는지 확인한다.

### 2. class / id

HTML의 클래스명과 CSS 선택자가 일치하는지 확인한다.

### 3. CSS 선택자

CSS가 실제 HTML 요소를 선택하고 있는지 확인한다.

### 4. 파일 경로

CSS, JS, 이미지, 폰트 경로를 확인한다.

### 5. 파일명

대소문자와 확장자를 확인한다.

### 6. CSS 연결

`default.css`와 페이지 CSS가 연결되어 있는지 확인한다.

### 7. 기존 CSS 영향

`default.css`에서 적용된 스타일 때문에 문제가 발생한 것은 아닌지 확인한다.

### 8. 브라우저 개발자 도구

필요한 경우 실제 적용된 CSS와 요소 상태를 확인한다.

---

## 28. 기존 코드와 새 브랜드의 관계

새 브랜드 로그인 화면은 완전히 새로운 코드를 만드는 것이 아니다.

다음 관계를 기본으로 한다.

```text
기존 버거킹 로그인 코드
        ↓
HTML 구조 유지
        ↓
CSS 작성 방식 유지
        ↓
공통 CSS / 접근성 방식 유지
        ↓
반응형 방식 유지
        ↓
브랜드별 디자인 변경
        ↓
새 브랜드 로그인 UI
```

즉, **기존 코드를 복사해서 색상만 바꾸는 것**이 목적이 아니다.

기존 코드가 어떻게 구성되어 있는지 이해한 후, 새 브랜드에서 필요한 부분만 변경한다.

---

## 29. AI가 답변할 때의 방식

AI가 새로운 브랜드 로그인 UI를 만들거나 수정할 때 다음 순서로 설명한다.

### 1. 유지되는 부분

기존 코드에서 그대로 사용할 부분을 설명한다.

### 2. 변경되는 부분

새 브랜드 때문에 변경해야 하는 부분을 설명한다.

### 3. 변경 이유

왜 해당 부분을 변경하는지 설명한다.

### 4. 수정 코드

필요한 경우에만 코드를 제공한다.

### 5. 확인 방법

학생이 직접 브라우저에서 확인할 방법을 설명한다.

학생이 직접 해결할 수 있는 문제라면 전체 코드를 바로 제공하기보다 **수정할 위치와 힌트**를 먼저 제시한다.

---

## 30. 핵심 원칙

이 프로젝트에서 가장 중요한 원칙은 다음과 같다.

> **기존 코드를 이해하고, 기존 구조와 스타일을 최대한 유지하면서 필요한 부분만 변경한다.**

AI는 코드를 대신 완성하는 것이 목적이 아니라, 기존 코드를 분석하고 학생이 스스로 수정하고 이해할 수 있도록 돕는 역할을 한다.
