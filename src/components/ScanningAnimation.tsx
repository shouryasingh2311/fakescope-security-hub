interface ScanningAnimationProps { readonly label?: string; }

export function ScanningAnimation({ label = 'Analysing...' }: ScanningAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin-slow" style={{ borderTopColor: '#ef4444', borderRightColor: 'rgba(239,68,68,0.3)' }} />
        <div className="absolute inset-2 rounded-full border-2 border-transparent" style={{ borderTopColor: '#7bd0ff', borderLeftColor: 'rgba(123,208,255,0.3)', animation: 'spin-slow 1.5s linear infinite reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-7 h-7" style={{ color: '#c2c6db' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono-geist tracking-instrument" style={{ color: '#7bd0ff' }}>{label}</span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="inline-block w-1 h-1 rounded-full" style={{ background: '#7bd0ff', animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </span>
      </div>
      <div className="w-full max-w-xs rounded-lg p-3 font-mono-geist text-xs space-y-1" style={{ background: 'rgba(4, 14, 31, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {[{ t: '0.1s', msg: 'Initiating threat analysis...', color: '#909097' }, { t: '0.4s', msg: 'Extracting features...', color: '#909097' }, { t: '0.9s', msg: 'Running classifier model...', color: '#7bd0ff' }].map((entry, i) => (
          <div key={i} className="flex gap-2" style={{ color: entry.color }}>
            <span style={{ color: '#46464c' }}>{entry.t}</span>
            <span>{entry.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
