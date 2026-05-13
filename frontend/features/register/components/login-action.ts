"use client";

import { redirect } from "next/navigation";

export const loginAction = async (data) => {
  const res = await fetch("http://localhost:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await res.json();
  if (!res.ok) {
    console.log(result);
    return;
  }
  if (res.ok) {
    console.log(result, "podemos ir a la pagina");
    redirect("/home");
  }
};
