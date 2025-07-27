// src/api/auth.js
const BACKEND = "https://cherrymap.click";

/**
 * ① localStorage에 accessToken이 있으면 바로 리턴
 * ② 없으면 /dev/token 호출 → 저장 → 리턴
 */
export async function getToken() {
  let token = localStorage.getItem("accessToken");
  if (token) return token;

  const res = await fetch(`${BACKEND}/dev/token`, { method: "POST" });
  if (!res.ok) throw new Error(`토큰 발급 실패 (${res.status})`);
  let raw = await res.text();
  token = raw.replace(/^"(.*)"$/, "$1");
  localStorage.setItem("accessToken", token);
  return token;
}