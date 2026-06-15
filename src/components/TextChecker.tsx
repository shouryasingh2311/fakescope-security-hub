import { useState } from 'react';
import { useTextChecker } from '../hooks/useChecker';
import { ResultCard } from './ResultCard';
import { ScanningAnimation } from './ScanningAnimation';

export function TextChecker() {
  const [text, setText] = useState('');
  const { result, loading, error, checkText } = useTextChecker();

  const handleScan = () => { if (text.trim()) checkText(text.trim()); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && e.ctrlKey) handleScan(); };

  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: 'rgba(21, 32, 49, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <label className="block text-xs font-semibold tracking-instrument font-mono-geist mb-3" style={{ color: '#909097' }} htmlFor="suspicious-text-input">
          PASTE SUSPICIOUS TEXT OR LINK
        </label>
        <textarea
          id="suspicious-text-input"
          className="w-full rounded-md text-sm leading-relaxed resize-none outline-none transition-all duration-200"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., URGENT: Your account has been locked. Click here to verify your identity: http://secure-login-update.com"
          style={{ background: '#040e1f', border: '1px solid rgba(255,255,255,0.08)', color: '#d8e3fb', padding: '12px', caretColor: '#7bd0ff' }}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(123,208,255,0.5)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs font-mono-geist" style={{ color: '#46464c' }}>Ctrl+Enter to scan</span>
          <button
            id="scan-text-btn"
            onClick={handleScan}
            disabled={loading || !text.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200 disabled:opacity-40 hover:brightness-110 active:scale-95"
            style={{ background: text.trim() && !loading ? 'rgba(31, 42, 60, 0.9)' : 'rgba(31, 42, 60, 0.4)', border: '1px solid rgba(255,255,255,0.12)', color: '#d8e3fb' }}
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Scan Text
          </button>
        </div>
      </div>
      {loading && <ScanningAnimation label="Analysing text..." />}
      {error && <div className="rounded-lg p-4 text-sm" style={{ background: 'rgba(164,2,23,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ffb3ad' }}><strong>Error:</strong> {error}</div>}
      {result && !loading && <ResultCard result={result} />}
    </div>
  );
}
