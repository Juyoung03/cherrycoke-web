const BACKEND = "https://cherrymap.click";

export async function getEmergencyPhone(userId) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const res = await fetch(`${BACKEND}/api/${userId}/phone`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      // 서버가 Accept 헤더를 요구하면 추가
      "Accept": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`비상연락망 조회 실패: ${res.status}`);
  }
  // 스웨거 예시에선 단순 문자열(string) 리턴이므로 text() 사용
  return await res.text();
}