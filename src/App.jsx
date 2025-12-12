import { useEffect, useState } from "react";
import StatusIndicator from "./components/StatusIndicator";
import { checkBackend } from "./api";

export default function App() {
  const [isBackendUp, setIsBackendUp] = useState(false);

  useEffect(() => {
    async function poll() {
      const status = await checkBackend();
      setIsBackendUp(status);
    }

    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Sample App</h1>
      <StatusIndicator isUp={isBackendUp} />
    </div>
  );
}
