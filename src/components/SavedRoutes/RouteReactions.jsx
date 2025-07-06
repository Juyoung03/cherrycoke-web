// src/components/SavedRoutes/RouteReactions.jsx

import React from "react";

export default function RouteReactions({ reactions }) {
  return (
    <div className="flex items-center gap-3 mt-2">
      {reactions.map((r) => (
        <div key={r.emoji} className="flex flex-col items-center text-sm">
          <span>{r.emoji}</span>
          <span className="text-xs text-gray-500">{r.date}</span>
        </div>
      ))}
    </div>
  );
}