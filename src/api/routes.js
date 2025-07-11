// src/api/routes.js
// 실제 API와 연동하여 저장된 경로 목록 조회 및 삭제를 수행합니다.

// 저장된 경로 목록 조회
export async function getSavedRoutes() {
  const token = localStorage.getItem("token") 
    || "eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsIm1lbWJlcklkIjoiNCIsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNzUyMjI0MDE4LCJleHAiOjE3NTIyMjQ2MTh9.80JVR-9jEdyAaDCKjjYnn03y_6614LIPQb6MWMA5rEWXP0crqf1y0OIVTFV3qDT6F5M63YmdVo0e0i_KK6spmg";

  const res = await fetch("http://3.34.123.246/api/routes/list", {
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
  // 서버 반환 스키마: { success, status, timeStamp, data: [ { id, displayName, mode, ... } ] }
  return json.data.map((item) => ({
    id: item.id,
    name: item.displayName,
    mode: item.mode === "도보" ? "walk" : "transit",
    date: new Date(json.timeStamp).getTime(),
    destination: item.displayName,
    reactions: item.reactions || [],
  }));
}

// 특정 저장 경로 삭제
export async function deleteSavedRoute(routeId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://3.34.123.246/api/routes/${routeId}`, {
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
