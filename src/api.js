import axios from "axios";

const API_BASE_URL = "http://52.21.239.222:8080";

export async function checkBackend() {
  try {
    const res = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 3000
    });
    return res.data.status === "up";
  } catch (err) {
    return false;
  }
}
