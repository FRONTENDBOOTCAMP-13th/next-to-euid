// 로그인 유효성 검사 및 메인 페이지 이동
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function (e) {
  e.preventDefault(); // 기본 제출 막기

  // const id = document.getElementById("id");회원가입
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // 각 필드 유효성 검사 + reportValidity로 경고 및 포커스 처리
  // if (!id.checkValidity()) {
  //   id.reportValidity(); // 경고 메시지 + 포커스 + 자동 스크롤
  //   return;
  // }

  if (!email.checkValidity()) {
    email.reportValidity(); // 이메일 유효성 검사 실패 시
    return;
  }

  if (!password.checkValidity()) {
    password.reportValidity(); // 비밀번호 유효성 검사 실패 시
    return;
  }

  // 모든 조건 충족 → 메인 페이지 이동
  window.location.href = "./page-main.html";
});
