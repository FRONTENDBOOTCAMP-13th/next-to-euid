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
