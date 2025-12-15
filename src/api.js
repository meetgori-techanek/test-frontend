import axios from "axios";

export async function checkBackend() {
  try {
    const res = await axios.get("health", { timeout: 3000 });
    return res.data.status === "up";
  } catch {
    return false;
  }
}
