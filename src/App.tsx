import { useMemo } from "react";

function getParam(name: string) {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "";
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      border: "1px solid #cbd5e1",
      background: "#ffffff",
      fontSize: 12
    }}>{children}</span>
  );
}

export default function App() {
  const repo = getParam("repo");           // "owner/repo" if present
  const pr = getParam("pr");               // PR number if present
  const preview = Boolean(pr);
  const prUrl = useMemo(() => (repo && pr) ? `https://github.com/${repo}/pull/${pr}` : "", [repo, pr]);
  const buildInfo = import.meta.env.VITE_COMMIT ?? "local";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Preview link copied!");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      alert("Preview link copied!");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)",
      color: "#0f172a"
    }}>
      {/* Top bar */}
      <header style={{
        maxWidth: 1100, margin: "0 auto", padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 12
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #10b981, #06b6d4)"
        }} />
        <strong style={{ fontSize: 18 }}>Preev</strong>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <Pill>PR Previews</Pill>
          <Pill>$0 Infra</Pill>
          <Pill>GitHub + Cloudflare</Pill>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 20px 48px" }}>
        {/* Preview banner (only when ?pr= is present) */}
        {preview && (
          <div style={{
            background: "#10b981",
            color: "white",
            padding: "12px 16px",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "white" }} />
            <strong>Preview Build — PR #{pr}</strong>
            {repo && (
              <span style={{ opacity: 0.95 }}>
                {" "}for <code style={{ background:"rgba(255,255,255,.2)", padding:"2px 6px", borderRadius:6 }}>{repo}</code>
              </span>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.9 }}>Build: {buildInfo}</span>
          </div>
        )}

        {/* Hero */}
        <section style={{
          padding: "28px 22px",
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          background: "white",
          boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          marginBottom: 20
        }}>
          <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.2 }}>
            PR → Live Preview — <span style={{ color: "#0ea5e9" }}>$0/month</span>
          </h1>
          <p style={{ marginTop: 8, fontSize: 16, opacity: 0.8 }}>
            Every Pull Request gets an instant, shareable URL. PMs/QA/devs can click and review with zero setup.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <button onClick={copyLink} style={{
              padding: "10px 14px", borderRadius: 10, border: "1px solid #0ea5e9",
              background: "white", color: "#0ea5e9", fontWeight: 600, cursor: "pointer"
            }}>
              Copy Preview Link
            </button>

            {prUrl ? (
              <a href={prUrl} target="_blank" rel="noreferrer" style={{
                padding: "10px 14px", borderRadius: 10, border: "1px solid #0ea5e9",
                background: "#0ea5e9", color: "white", textDecoration: "none", fontWeight: 600
              }}>
                Open PR #{pr}
              </a>
            ) : (
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{
                padding: "10px 14px", borderRadius: 10, border: "1px solid #cbd5e1",
                background: "white", color: "#0f172a", textDecoration: "none", fontWeight: 600
              }}>
                How to try: Fork → PR
              </a>
            )}
          </div>
        </section>

        {/* Feature grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 14 }}>
          {[
            { title: "Auto PR Comment", desc: "Bot posts the preview URL to the PR." },
            { title: "Zero Setup", desc: "No cloning or env config. Just click." },
            { title: "$0 Infra", desc: "Cloudflare Pages + GitHub Actions free tiers." },
            { title: "Tidy Updates", desc: "Comment updates on each push." }
          ].map((f, i) => (
            <div key={i} style={{
              padding: 16, border: "1px solid #e2e8f0", borderRadius: 12, background: "white"
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: i % 2 ? "#06b6d4" : "#10b981", opacity: 0.15, marginBottom: 8
              }} />
              <strong style={{ display: "block", marginBottom: 6 }}>{f.title}</strong>
              <span style={{ opacity: 0.75, fontSize: 14 }}>{f.desc}</span>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section style={{
          marginTop: 22, padding: 16, border: "1px dashed #cbd5e1",
          borderRadius: 12, background: "#f8fafc"
        }}>
          <h3 style={{ marginTop: 0 }}>How it works</h3>
          <ol style={{ marginTop: 8 }}>
            <li>Open a Pull Request with any change.</li>
            <li>Cloudflare Pages builds a <strong>Preview</strong> for that branch.</li>
            <li>GitHub Action calls Cloudflare API → comments the Preview link.</li>
            <li>Share the link — no local setup needed.</li>
          </ol>
          <p style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>
            Tip: This link includes <code>?repo=&amp;pr=</code> so the banner shows PR context.
          </p>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", opacity: 0.6, fontSize: 12, marginTop: 26 }}>
          Built with Cloudflare Pages + GitHub Actions · Build: {buildInfo}
        </footer>
      </main>
    </div>
  );
}
