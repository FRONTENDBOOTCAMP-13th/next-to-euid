// 모달창 안내 문구
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('disclaimer-modal');
  const confirmBtn = document.getElementById('modal-confirm-btn');

  confirmBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    // 필요 시 focus 이동
    document.querySelector('header').focus();
  });
});