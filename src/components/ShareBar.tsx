import React from "react";

function getParam(name: string) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

export default function ShareBar() {
  const url = window.location.href;
  const pr = getParam("pr");
  const repo = getParam("repo");
  const prUrl = (pr && repo) ? `https://github.com/${repo}/pull/${pr}` : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Preview link copied!");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Preview link copied!");
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: "12px 16px",
      background: "#f1f5f9",
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      marginBottom: 16
    }}>
      <button onClick={copy} style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        background: "white",
        cursor: "pointer"
      }}>
        Copy Preview Link
      </button>
      {prUrl && (
        <a href={prUrl} target="_blank" rel="noreferrer" style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #0ea5e9",
          color: "#0ea5e9",
          textDecoration: "none",
          fontWeight: 600
        }}>
          Open PR on GitHub
        </a>
      )}
      <span style={{ marginLeft: "auto", opacity: .7, fontSize: 12 }}>
        Share this URL to review the change.
      </span>
    </div>
  );
}
