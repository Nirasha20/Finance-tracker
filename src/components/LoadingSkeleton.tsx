// src/components/LoadingSkeleton.tsx

const shimmer: React.CSSProperties = {
  background: "linear-gradient(90deg, var(--skeleton-1) 25%, var(--skeleton-2) 50%, var(--skeleton-1) 75%)",
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
            padding: "24px", background: "var(--surface)",
            border: "1px solid var(--border-strong)",
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