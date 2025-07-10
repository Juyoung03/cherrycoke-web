// src/api/routes.js

// 임시 더미 데이터
const _dummy = [
    { id: 1, name: "홍익대학교", mode: "transit", date: 0, destination: "", reactions: [] },
    { id: 2, name: "체리공원",    mode: "walk",    date: 0, destination: "", reactions: [] },
  ];
  
  // 0) 실제로는 fetch를 여기서 호출
  export async function getSavedRoutes(providerId) {
    // 내일: return await fetch(`/api/${providerId}/routes/list`).then(r=>r.json());
    await new Promise((r) => setTimeout(r, 200)); // 딜레이 시뮬
    return _dummy;
  }
  
  export async function deleteSavedRoute(providerId, routeId) {
    // 내일: return fetch(..., { method: "DELETE" });
    await new Promise((r) => setTimeout(r, 100));
    return { ok: true };
  }