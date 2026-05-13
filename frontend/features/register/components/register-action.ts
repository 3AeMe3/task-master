"use client";

type RegisterActionProps = {
  email: string;
  password: string;
};

export async function registerAction(data: RegisterActionProps) {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error register");
    }
    console.log("registerAction", result);
  } catch (err) {
    console.log(err);
  }
}
