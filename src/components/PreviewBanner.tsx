import React from "react";

function getParam(name: string) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

export default function PreviewBanner() {
  // If the PR number is in the URL (?pr=12), we treat this as a preview context.
  const pr = getParam("pr");
  const repo = getParam("repo"); // owner/repo

  if (!pr) return null;

  const prUrl = repo ? `https://github.com/${repo}/pull/${pr}` : "";

  return (
    <div style={{
      background: "#0ea5e9",
      color: "white",
      padding: "12px 16px",
      borderRadius: 12,
      marginBottom: 16
    }}>
      <strong>Preview Build</strong> — PR #{pr}
      {repo && (
        <>
          {" "}for <code style={{ background:"rgba(255,255,255,.2)", padding:"2px 6px", borderRadius:6 }}>{repo}</code>
          {" "}· <a href={prUrl} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Open PR</a>
        </>
      )}
    </div>
  );
}
