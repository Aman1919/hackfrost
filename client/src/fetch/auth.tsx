import { BACKEND_URL } from "../contants"; // Ensure the correct import path

export async function authenticateUser(token: string) {
  try {
    const url = `${BACKEND_URL}/auth/refresh`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to authenticate: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // The returned data should include the authenticated user and token
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    throw error; // Propagate the error to the caller
  }
}
