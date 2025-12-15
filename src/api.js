import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
