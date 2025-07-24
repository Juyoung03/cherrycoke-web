// src/pages/EditPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate }               from "react-router-dom";
import EditHeader                    from "../components/SavedRoutesEdit/EditHeader";
import EditList                      from "../components/SavedRoutesEdit/EditList";
import EditFooter                    from "../components/SavedRoutesEdit/EditFooter";
import { getSavedRoutes, deleteSavedRoute } from "../api/routes";

export default function EditPage() {
  const navigate = useNavigate();
  const [routes, setRoutes]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [removedIds, setRemovedIds] = useState([]);  // ① 삭제 예정 ID 목록

  useEffect(() => {
    getSavedRoutes()
      .then((data) => setRoutes(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 삭제 버튼 누르면 로컬에서만 제거
  const handleDelete = (id) => {
    setRemovedIds((prev) => [...prev, id]);
    setRoutes((prev)    => prev.filter((r) => r.id !== id));
  };

  // “수정 완료” 눌렀을 때 실제 API 호출
  const handleSave = async () => {
    try {
      await Promise.all(removedIds.map((id) => deleteSavedRoute(id)));
    } catch (e) {
      console.error("삭제 반영 실패", e);
      alert("일부 삭제 요청이 실패했습니다.");
    }
    navigate(-1);
  };

  // 변경사항이 하나라도 있으면 hasChanges=true
  const hasChanges = removedIds.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <EditHeader onBack={() => navigate(-1)} />

      <main className="flex-1 overflow-auto p-4 pt-[88px]">
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : (
          <EditList routes={routes} onDelete={handleDelete} />
        )}
      </main>

      {/* hasChanges 상태를 전달 */}
      <EditFooter onSave={handleSave} hasChanges={hasChanges}/>
    </div>
  );
}