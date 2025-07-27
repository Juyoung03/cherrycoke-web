// src/api/member.js
import { getToken } from "./auth";
const BACKEND = "https://cherrymap.click";

async function fetchWithAuth(path) {
  const token = await getToken();
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