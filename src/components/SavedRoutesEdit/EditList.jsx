import React from "react";
import EditItem from "./EditItem";

export default function EditList({ routes, onDelete }) {
  return (
    <ul className="space-y-4">
      {routes.map((route) => (
        <EditItem
          key={route.id}
          route={route}
          onDelete={() => onDelete(route.id)}
        />
      ))}
    </ul>
  );
}