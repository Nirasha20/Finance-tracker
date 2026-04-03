// src/components/LoadingSkeleton.tsx

const shimmer: React.CSSProperties = {
  background: "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.4s infinite",
  borderRadius: "8px",
};

export default function LoadingSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1, minWidth: "220px", borderRadius: "16px",
            padding: "24px", background: "#fff",
            border: "1px solid #e5e7eb",
          }}>
            <div style={{ ...shimmer, height: "14px", width: "40%", marginBottom: "16px" }} />
            <div style={{ ...shimmer, height: "32px", width: "70%", marginBottom: "16px" }} />
            <div style={{ ...shimmer, height: "13px", width: "50%" }} />
          </div>
        ))}
      </div>
    </>
  );
}