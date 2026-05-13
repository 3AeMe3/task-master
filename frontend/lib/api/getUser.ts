export default async function getUser() {
  try {
    const response = await fetch("http://localhost:4000/me", {
      method: "GET",
      credentials: "include", // Incluir cookies en la solicitud
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await response.json();
    return user.user;
  } catch (err) {
    return { error: "Error fetching user data", err };
  }
}
