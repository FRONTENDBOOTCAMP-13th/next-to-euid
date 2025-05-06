document.addEventListener('DOMContentLoaded', () => {
  const a11yBtn = document.getElementById('a11y-menu-toggle');
  const closeBtn = document.getElementById('close-button');
  const sideMenu = document.querySelector('.side-menu-inner');

  // 메뉴 열기 버튼 클릭 시
  a11yBtn.addEventListener('click', () => {
    const expanded = a11yBtn.getAttribute('aria-expanded') === 'true';
    a11yBtn.setAttribute('aria-expanded', String(!expanded));
    sideMenu.classList.toggle('open');
  });

  // 닫기 버튼 클릭 시
  closeBtn.addEventListener('click', () => {
    a11yBtn.setAttribute('aria-expanded', 'false');
    sideMenu.classList.remove('open');
  });
});

// 돋보기 생성 모듈
const Magnifier = (function () {
  // 비공개 변수
  let magnifyActive = false;
  let magnifier = null;
  let magnifierContent = null;
  let toggleButton = null;
  let settings = {};

  // 마우스 이동 핸들러
  function handleMouseMove(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 스크롤 위치 고려
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    // 돋보기 크기 계산 (width 속성에서 가져옴)
    const magnifierSize = parseInt(magnifier.style.width, 10);
    const halfSize = magnifierSize / 2;

    // 돋보기 위치 설정
    magnifier.style.left = `${mouseX - halfSize}px`;
    magnifier.style.top = `${mouseY - halfSize}px`;

    // CSS transform으로 배경 확대
    const zoomLevel = settings.zoomLevel; // 확대 배율

    // 중요: 마우스 위치에 맞게 콘텐츠 위치 조정
    // 마우스 위치 * 확대 배율 - 돋보기 크기의 절반
    magnifierContent.style.left = `${-(mouseX + scrollX) * zoomLevel + halfSize}px`;
    magnifierContent.style.top = `${-(mouseY + scrollY) * zoomLevel + halfSize}px`;

    // 돋보기 표시
    magnifier.style.display = 'block';

    // 확대 효과 적용 (CSS transform 사용)
    magnifier.style.backgroundImage = 'none';
    magnifier.style.backgroundSize = `${document.documentElement.scrollWidth * zoomLevel}px ${document.documentElement.scrollHeight * zoomLevel}px`;
    magnifier.style.backgroundPosition = `${-mouseX * zoomLevel + halfSize}px ${-mouseY * zoomLevel + halfSize}px`;

    /*
    magnifier.style.transform = 'none';
    magnifier.style.transformOrigin = `${originX}% ${originY}%`;
*/

    // 돋보기에 내부 요소 추가
    // magnifier.appendChild(magnifierContent);

    // 마우스 이동 핸들러에서 내부 요소 위치 및 확대 설정
    magnifierContent.style.transform = `scale(${zoomLevel})`;
    magnifierContent.style.transformOrigin = '0 0';
    magnifierContent.style.position = 'absolute';
    magnifierContent.style.top = `${-mouseY * zoomLevel + halfSize}px`;
    magnifierContent.style.left = `${-mouseX * zoomLevel + halfSize}px`;
  }

  // 돋보기 토글 함수
  function toggleMagnifier() {
    magnifyActive = !magnifyActive;

    if (magnifyActive) {
      if (toggleButton) {
        toggleButton.textContent = settings.buttonOffText;
      }
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      if (toggleButton) {
        toggleButton.textContent = settings.buttonText;
      }
      document.removeEventListener('mousemove', handleMouseMove);
      magnifier.style.display = 'none';
    }
  }

  // 돋보기 초기화 함수
  function init(options = {}) {
    // 기본 옵션 설정
    const defaultOptions = {
      size: 100, // 돋보기 크기
      zoomLevel: 2, // 확대 배율 (150%)
      borderColor: 'white',
      showButton: true, // 토글 버튼 표시 여부
      buttonText: '돋보기 켜기',
      buttonOffText: '돋보기 끄기',
    };

    // 사용자 옵션과 기본 옵션 병합
    settings = { ...defaultOptions, ...options };

    // CSS 파일이 로드되었는지 확인
    const isCSSLoaded = Array.from(document.styleSheets).some((sheet) => {
      try {
        return sheet.href && sheet.href.includes('a11y-component.css');
      } catch (e) {
        return false;
      }
    });

    // CSS 파일이 로드되지 않았으면 경고
    if (!isCSSLoaded) {
      console.warn(
        '돋보기 CSS 로딩이 안 됐습니다. a11y-component.css를 HTML에 추가해주세요.'
      );
    }

    // 돋보기 요소 스타일 설정
    magnifier = document.createElement('div');
    magnifier.className = 'magnifier';
    magnifier.style.position = 'fixed'; // 중요: fixed 위치 설정
    magnifier.style.width = `${settings.size}px`;
    magnifier.style.height = `${settings.size}px`;
    magnifier.style.borderRadius = '50%';
    magnifier.style.overflow = 'hidden';
    magnifier.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    magnifier.style.border = `2px solid ${settings.borderColor}`;
    magnifier.style.zIndex = '9999';
    magnifier.style.pointerEvents = 'none';
    document.body.appendChild(magnifier);

    magnifier.style.backgroundRepeat = 'no-repeat';

    // 내부 콘텐츠 요소 생성 및 스타일 설정
    magnifierContent = document.createElement('div');
    magnifierContent.className = 'magnifier-content';
    magnifierContent.style.position = 'absolute';
    magnifierContent.style.top = '0';
    magnifierContent.style.left = '0';
    magnifierContent.style.width = document.documentElement.scrollWidth + 'px';
    magnifierContent.style.height =
      document.documentElement.scrollHeight + 'px';

    // 중요: 페이지 콘텐츠 복제
    const htmlClone = document.documentElement.cloneNode(true);

    // 복제된 돋보기 요소 자체는 제거 (무한 반복 방지)
    const clonedMagnifier = htmlClone.querySelector('.magnifier');
    if (clonedMagnifier) {
      clonedMagnifier.parentNode.removeChild(clonedMagnifier);
    }

    // 복제된 토글 버튼 제거
    const clonedButton = htmlClone.querySelector('.toggle-magnifier-btn');
    if (clonedButton) {
      clonedButton.parentNode.removeChild(clonedButton);
    }

    // 복제된 내용을 magnifierContent에 추가
    magnifierContent.appendChild(htmlClone);

    // magnifierContent를 magnifier에 추가
    magnifier.appendChild(magnifierContent);

    // 토글 버튼 생성 (옵션에 따라)
    if (settings.showButton) {
      toggleButton = document.createElement('button');
      toggleButton.className = 'toggle-magnifier-btn';
      toggleButton.textContent = settings.buttonText;

      // 변경 전: document.body.appendChild(toggleButton);

      // 변경 후: 특정 li 요소에 버튼 추가
      const targetElement = document.querySelector(
        '.component-atomic-icon-start--active .icon-start-fullmy--active'
      );
      if (targetElement) {
        targetElement.appendChild(toggleButton);
      } else {
        // 요소를 찾지 못한 경우 body에 추가
        document.body.appendChild(toggleButton);
      }

      // 버튼 클릭 이벤트 리스너
      toggleButton.addEventListener('click', function () {
        toggleMagnifier(settings);
      });
    }

    // 키보드 단축키 설정 (M 키)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'm' || e.key === 'M') {
        toggleMagnifier(settings);
      }
    });

    // 공개 API 반환
    return {
      enable: function () {
        if (!magnifyActive) {
          toggleMagnifier(settings);
        }
      },
      disable: function () {
        if (magnifyActive) {
          toggleMagnifier(settings);
        }
      },
      isActive: function () {
        return magnifyActive;
      },
      setZoom: function (newZoom) {
        settings.zoomLevel = newZoom;
      },
    };
  }

  // 공개 API
  return {
    init: init,
  };
})();
