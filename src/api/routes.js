// src/api/routes.js
import { getToken } from "./auth";
// 실제 API와 연동하여 저장된 경로 목록 조회 및 삭제를 수행합니다.
  const BACKEND = "https://cherrymap.click";

/**
 * localStorage → `accessToken`을 꺼내온다.
 * 없다면(로그인 안 됨) 호출한 쪽에서 catch 할 수 있도록 에러 throw
 */

 // 저장된 경로 목록 조회
 export async function getSavedRoutes() {
  const token = await getToken();
  console.log("🛡️ Sending request with token:", token);
  const res = await fetch(`${BACKEND}/api/routes/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept":        "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch saved routes: ${res.status}`);
  }
  const json = await res.json();
  console.log(json.data);
  // 서버 반환 스키마: { success, status, timeStamp, data: [ { id, displayName, mode, ... } ] }
  return json.data.map((item) => ({
    id: item.routeId,
    name: item.routeName,
    mode: item.mode === "도보" ? "walk" : "transit",
    date: new Date(json.timeStamp).getTime(),
    destination: item.routeName,
    reactions: item.reactions || [],
  }));
}

// 특정 저장 경로 삭제
export async function deleteSavedRoute(routeId) {
 const token = await getToken();
  const res = await fetch(`${BACKEND}/api/routes/${routeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to delete route: ${res.status}`);
  }
  return await res.json();
}

// 저장된 경로 목적지 받아오기
export async function sendSavedRoute(routeId) {
  const res = await fetch(`${BACKEND}/api/routes/${routeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to get route: ${res.status}`);
  }

   const json = await res.json();
  // data가 배열인지 객체인지 자동 분기
  const d = Array.isArray(json.data) ? json.data[0] : json.data;
  return {
    destination: d.endName,  // 백엔드 필드명 그대로
    endLat:      d.endLat,
    endLng:      d.endLng,
  };
     
}