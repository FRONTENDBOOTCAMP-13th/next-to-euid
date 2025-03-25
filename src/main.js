import './style.css';

// 진입 시 모든 .fade-in-up 요소에 순차 애니메이션 추가
// document.addEventListener('DOMContentLoaded', () => {
//   const elements = document.querySelectorAll('.fade-in-up');
//   elements.forEach((el, i) => {
//     el.style.animationDelay = `${i * 0.2 + 0.3}s`;
//     el.classList.add('fade-in-up');
//   });
// });

// 프로필 카드 클릭 시 이름 강조 효과
// document.querySelectorAll('.profile-card').forEach(card => {
//   card.addEventListener('click', () => {
//     card.classList.toggle('active-profile');
//   });
// });

// 강조 스타일
// const style = document.createElement('style');
// style.textContent = `
//   .active-profile {
//     outline: 3px solid #fda085;
//     transition: outline 0.3s ease;
//   }
// `;
// document.head.append(style);

// copy2
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.report-title');
  const year = document.querySelector('.report-year');
  const button = document.querySelector('.download-btn');

  setTimeout(() => {
    title.classList.add('visible');
  }, 200);

  setTimeout(() => {
    year.classList.add('visible');
  }, 400);

  setTimeout(() => {
    button.classList.add('visible');
  }, 600);
});
