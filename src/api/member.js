// src/api/member.js
const BACKEND = "https://cherrymap.click";
export function getToken() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인이 필요합니다. accessToken 없음");
  return token;
}

async function fetchWithAuth(path) {
  const token = getToken();
  const res = await fetch(`${BACKEND}${path}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${path} 조회 실패: ${res.status}`);
  return await res.json();
}

export async function getMemberInfo() {
  // /api/member/info → { data: { memberId, nickname, username, … } }
  const json = await fetchWithAuth("/api/member/info");
  return json.data;
}

export async function getEmergencyContact() {
  // /api/member/phone → { data: { memberId, phoneNumber, phoneType } }
  const json = await fetchWithAuth("/api/member/phone");
  return json.data;
}