// 회원가입 유효성 검사 및 메인 페이지 이동
const signupBtn = document.getElementById('signup-policy');

signupBtn.addEventListener('click', function (e) {
  e.preventDefault(); // 기본 제출 막기

  const id = document.getElementById('id');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const termsCheckbox = document.getElementById('checkbox-2');

  // 1. 아이디 유효성 검사
  if (!id.checkValidity()) {
    id.reportValidity();
    return;
  }

  // 2. 이메일 유효성 검사
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }

  // 3. 비밀번호 유효성 검사
  if (!password.checkValidity()) {
    password.reportValidity();
    return;
  }

  // 4. 약관 체크박스 검사
  if (!termsCheckbox.checked) {
    alert('회원가입을 위해 개인정보 처리방침 및 이용약관에 동의해주세요.');
    termsCheckbox.focus();
    return;
  }

  // 모든 조건 충족 시 메인 페이지로 이동
  window.location.href = './page-main.html';
});
