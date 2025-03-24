/** 모달창 기본 세팅 **/
document.addEventListener('DOMContentLoaded', () => {
  // DOM 선택 부분
  const emailDialogButton = document.querySelector('.show-email-dialog');
  const passwordDialogButton = document.querySelector('.show-password-dialog');
  const closeDialogButtons = document.querySelectorAll('.close-dialog');
  const emailDialog = document.querySelector('.email-dialog');
  const passwordDialog = document.querySelector('.password-dialog');

  // 페이지 로드 시 모든 다이얼로그 닫기
  emailDialog.close();
  passwordDialog.close();

  // 함수 구현 부분 - 수정된 부분
  const openEmailDialog = () => {
    emailDialog.showModal();

    // 자동 포커스 방지
    const emailInput = emailDialog.querySelector('.input-start-sign-up');
    if (emailInput) {
      // autofocus 속성 제거 (있다면)
      emailInput.removeAttribute('autofocus');

      // 다이얼로그 자체에 포커스하여 인풋으로의 자동 포커스 방지
      setTimeout(() => {
        emailDialog.focus();
      }, 0);
    }
  };

  const openPasswordDialog = () => {
    passwordDialog.showModal();

    // 자동 포커스 방지
    const passwordInput = passwordDialog.querySelector('.input-start-sign-up');
    if (passwordInput) {
      // autofocus 속성 제거 (있다면)
      passwordInput.removeAttribute('autofocus');

      // 다이얼로그 자체에 포커스하여 인풋으로의 자동 포커스 방지
      setTimeout(() => {
        passwordDialog.focus();
      }, 0);
    }
  };

  const closeDialog = (dialog) => dialog.close();

  // 이벤트 바인딩 부분
  emailDialogButton.addEventListener('click', openEmailDialog);
  passwordDialogButton.addEventListener('click', openPasswordDialog);

  // 모든 닫기 버튼에 이벤트 리스너 추가
  closeDialogButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // 부모 다이얼로그 찾아서 닫기
      const dialog = button.closest('dialog');
      if (dialog) {
        dialog.close();
      }
    });
  });
});

/** 새 모달 생성 코드  */
function showNewModal(event) {
  // 기본 이벤트(페이지 이동) 방지
  // event.preventDefault();

  // 현재 모달 닫기 (선택사항)
  document.querySelector('.email-dialog').close();

  // 새 모달 열기
  document.querySelector('.find-email-modal').showModal();
}
