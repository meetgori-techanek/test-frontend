export default function StatusIndicator({ isUp }) {
  const color = isUp ? "green" : "red";
  const text = isUp ? "Backend is UP" : "Backend is DOWN";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: color
        }}
      ></span>
      <span>{text}</span>
    </div>
  );
}
