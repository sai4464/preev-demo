import { useState } from 'react'
import './App.css'
import PreviewBanner from './components/PreviewBanner'
import ShareBar from './components/ShareBar'

function App() {
  const [count, setCount] = useState(0)
  const buildInfo = import.meta.env.VITE_COMMIT ?? 'local'

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <PreviewBanner />
      <ShareBar />

      <h1 style={{ marginTop: 0 }}>Preev Demo</h1>
      <p>This is your PR Preview demo app. Open a PR → get a live link.</p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
        <button onClick={() => setCount((c) => c + 1)} style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          background: "white",
          cursor: "pointer",
          fontWeight: 600
        }}>
          Count: {count}
        </button>
        <span style={{ opacity: 0.7 }}>Interactive widget to show the preview is live.</span>
      </div>

      <div style={{
        marginTop: 24,
        padding: 16,
        border: "1px dashed #cbd5e1",
        borderRadius: 12,
        background: "#f8fafc"
      }}>
        <h3 style={{ marginTop: 0 }}>How this demo works</h3>
        <ol>
          <li>Push a branch and open a PR on GitHub.</li>
          <li>Cloudflare Pages builds a <strong>Preview</strong> for that branch.</li>
          <li>Our workflow comments the Preview URL on the PR.</li>
          <li>Open this link to review changes without local setup.</li>
        </ol>
        <p style={{ opacity: 0.7, fontSize: 12 }}>Build: {buildInfo}</p>
      </div>
    </div>
  )
}

export default App
