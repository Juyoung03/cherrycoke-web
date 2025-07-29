import { getToken } from "./auth";
const BACKEND = import.meta.env.VITE_BACKEND_URL;

export async function sendChatMessage({
    message, lat, lng, destination, mode
}) {
    const token = await getToken();

    const payload = {
        message,
        location: {
            latitude: lat,
            longitude: lng,
        },
        destination_address: destination || "",
        mode: mode || "홈",
        user_context: message,
    };

    const res = await fetch(`${BACKEND}/api/v1/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
        credentials: "include"
    });

    if (!res.ok) throw new Error(`챗봇 연결 실패: ${res.status}`);
    return await res.json();
}