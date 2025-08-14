function getParam(name: string) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

export default function PreviewBanner() {
  const pr = getParam("pr");
  const repo = getParam("repo"); // owner/repo

  if (!pr) return null;

  const prUrl = repo ? `https://github.com/${repo}/pull/${pr}` : "";

  return (
    <div style={{
      background: "#10b981",
      color: "white",
      padding: "12px 16px",
      borderRadius: 12,
      marginBottom: 16,
      display: "flex",
      gap: 8,
      alignItems: "center"
    }}>
      <span style={{ display:"inline-block", width:10,height:10,borderRadius:"50%",background:"white" }} />
      <strong>Preview Build — PR #{pr}</strong>
      {repo && (
        <>
          {" "}for <code style={{ background:"rgba(255,255,255,.2)", padding:"2px 6px", borderRadius:6 }}>{repo}</code>
          {" "}· <a href={prUrl} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline" }}>Open PR</a>
        </>
      )}
    </div>
  );
}
