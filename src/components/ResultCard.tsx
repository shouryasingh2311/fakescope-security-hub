import { useEffect, useState } from 'react';
import type { ScanResult } from '../data/mockData';
import { scamCategoryLabels } from '../data/mockData';

interface ResultCardProps { readonly result: ScanResult; }

function getDangerColor(score: number) {
  if (score >= 75) return { text: '#ef4444', label: 'CRITICAL' };
  if (score >= 50) return { text: '#f97316', label: 'HIGH' };
  if (score >= 25) return { text: '#eab308', label: 'MODERATE' };
  return { text: '#22c55e', label: 'LOW' };
}

function getDangerLevel(score: number) {
  if (score >= 75) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 25) return 'moderate';
  return 'low';
}

export function ResultCard({ result }: ResultCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const { text: scoreColor, label: severityLabel } = getDangerColor(result.danger_score);
  const dangerLevel = getDangerLevel(result.danger_score);
  const isCritical = dangerLevel === 'critical';
  const isHigh = dangerLevel === 'high';

  useEffect(() => {
    setDisplayScore(0);
    let start = 0;
    const target = result.danger_score;
    const step = target / (1000 / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setDisplayScore(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [result.danger_score]);

  const typeColor = result.type === 'deepfake' ? '#7bd0ff' : result.type === 'safe' ? '#22c55e' : '#ffb3ad';
  const categoryLabel = result.type === 'safe' ? 'Safe Content' : result.type === 'deepfake' ? 'AI-Generated' : scamCategoryLabels[result.scam_category];

  return (
    <div className="animate-fade-in-up w-full">
      <div
        className={`relative overflow-hidden rounded-lg p-5 mb-4 ${isCritical || isHigh ? 'animate-danger-pulse' : ''}`}
        style={{ background: 'rgba(21, 32, 49, 0.85)', backdropFilter: 'blur(20px)', border: `1px solid ${isCritical ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}` }}
      >
        {isCritical && <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.12) 0%, transparent 70%)' }} />}

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="font-black leading-none mb-1 animate-number-tick" style={{ fontSize: 'clamp(64px, 15vw, 88px)', color: scoreColor, textShadow: `0 0 30px ${scoreColor}80`, letterSpacing: '-0.04em' }}>
              {displayScore}
            </div>
            <div className="text-xs font-semibold tracking-instrument font-mono-geist mb-3" style={{ color: scoreColor }}>
              {severityLabel} · DANGER SCORE
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${typeColor}18`, border: `1px solid ${typeColor}40`, color: typeColor }}>
              {result.type === 'scam' && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
              {result.type === 'deepfake' && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>}
              {result.type === 'safe' && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
              {categoryLabel}
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            <svg className="w-16 h-16" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <circle cx="32" cy="32" r="28" fill="none" stroke={scoreColor} strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(result.danger_score / 100) * 175.93} 175.93`} strokeDashoffset="43.98" style={{ transition: 'stroke-dasharray 1s ease-out' }} />
              <text x="32" y="37" textAnchor="middle" fill={scoreColor} fontSize="11" fontWeight="700" fontFamily="Inter">{result.danger_score}%</text>
            </svg>
          </div>
        </div>
        <p className="text-sm leading-relaxed mt-3 pt-3 border-t border-white/[0.06]" style={{ color: '#c7c6cd' }}>{result.explanation}</p>
      </div>

      {result.red_flags.length > 0 && (
        <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(17, 28, 45, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-xs font-semibold tracking-instrument font-mono-geist mb-3" style={{ color: '#909097' }}>DETECTED RED FLAGS</h3>
          <ul className="space-y-2">
            {result.red_flags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#ffb3ad' }}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.precautions.length > 0 && (
        <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(17, 28, 45, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-xs font-semibold tracking-instrument font-mono-geist mb-3" style={{ color: '#7bd0ff' }}>RECOMMENDED PRECAUTIONS</h3>
          <ul className="space-y-2">
            {result.precautions.map((action, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#d8e3fb' }}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: '#7bd0ff' }}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.block_recommended && (
        <div className="flex items-center gap-3 rounded-lg p-3.5 mb-3" style={{ background: 'rgba(164, 2, 23, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>Block Recommended</p>
            <p className="text-xs" style={{ color: '#ffb3ad' }}>Immediately block this sender or source</p>
          </div>
        </div>
      )}

      <a
        href={`https://${result.report_to}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
        style={{
          background: result.block_recommended ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #1f2a3c, #2a3548)',
          color: '#ffffff',
          border: result.block_recommended ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: result.block_recommended ? '0 0 20px rgba(239,68,68,0.3)' : 'none',
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        Report to {result.report_to}
        <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
      </a>
    </div>
  );
}
