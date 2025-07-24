// src/api/routes.js
// 실제 API와 연동하여 저장된 경로 목록 조회 및 삭제를 수행합니다.

// 저장된 경로 목록 조회
// export async function getSavedRoutes() {
//   const token = localStorage.getItem("token") 
//     || "eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm1lbWJlcklkIjoiNCIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzUyMjI0MDE4LCJleHAiOjE3NTIyMjQ2MTh9.80JVR-9jEdyAaDCKjjYnn03y_6614LIPQb6MWMA5rEWXP0crqf1y0OIVTFV3qDT6F5M63YmdVo0e0i_KK6spmg";

  const BACKEND = "https://cherrymap.click";
  const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm1lbWJlcklkIjoiMSIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzUzMjgzMjE5LCJleHAiOjE3NTM5NzQ0MTl9.hGqO2t9_ErxMy36CU5HIbGHsCQsTsKuDe6U_dlpIsPrMGum-RNnMzs7bZrJSGpgfqnIr4BlCoKl2mjsuR6hAqQ";

   // ① 토큰 가져오기: localStorage → 없으면 /dev/token 호출
//  async function getToken() {
//    let token = localStorage.getItem("token");
//    if (token) return token;

//    const res = await fetch(`${BACKEND}/dev/token`, { method: "POST" });
//    if (!res.ok) throw new Error(`토큰 발급 실패 ${res.status}`);

//    // Swagger 응답이 "토큰문자열" 형식일 수 있어 따옴표 제거
//    let raw = await res.text();
//    token = raw.replace(/^"(.*)"$/, "$1");
//    localStorage.setItem("token", token);   // 캐시
//    return token;
//  }

 // 저장된 경로 목록 조회
 export async function getSavedRoutes() {
  // const token = await getToken();
  const res = await fetch(`${BACKEND}/api/routes/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TOKEN}`,
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
  // const token = await getToken();
  const res = await fetch(`${BACKEND}/api/routes/${routeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
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
      Authorization: `Bearer ${TOKEN}`,
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