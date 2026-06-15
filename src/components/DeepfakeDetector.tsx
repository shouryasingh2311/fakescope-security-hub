import { useRef, useState } from 'react';
import { useDeepfakeDetector } from '../hooks/useChecker';
import { ResultCard } from './ResultCard';
import { ScanningAnimation } from './ScanningAnimation';

export function DeepfakeDetector() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { result, loading, error, checkDeepfake } = useDeepfakeDetector();

  const isAccepted = (f: File) => f.type.startsWith('image/') || f.type.startsWith('video/');
  const handleFile = (f: File) => { if (isAccepted(f)) setFile(f); };
  const isVideo = file?.type.startsWith('video/');

  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: 'rgba(21, 32, 49, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mb-3">
          <h3 className="text-base font-bold" style={{ color: '#d8e3fb' }}>Media Analysis</h3>
          <p className="text-xs mt-0.5" style={{ color: '#909097' }}>Upload video or image for deepfake detection.</p>
        </div>
        <div
          id="deepfake-drop-zone"
          className="rounded-md cursor-pointer transition-all duration-200"
          style={{ border: `2px dashed ${dragging ? 'rgba(123,208,255,0.6)' : file ? 'rgba(123,208,255,0.25)' : 'rgba(255,255,255,0.1)'}`, background: dragging ? 'rgba(123,208,255,0.04)' : 'rgba(4, 14, 31, 0.5)', minHeight: '130px' }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept="image/*,video/*" className="sr-only" id="deepfake-file-input" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          <div className="flex flex-col items-center justify-center py-8 gap-2.5">
            <svg className="w-8 h-8" style={{ color: file ? '#7bd0ff' : '#46464c' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {isVideo
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              }
            </svg>
            {file ? (
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: '#7bd0ff' }}>{file.name}</p>
                <p className="text-xs mt-0.5 font-mono-geist" style={{ color: '#46464c' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB · {isVideo ? 'Video' : 'Image'}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm" style={{ color: '#c7c6cd' }}>Drag and drop file here</p>
                <p className="text-xs mt-0.5 font-mono-geist" style={{ color: '#46464c' }}>MP4, MOV, PNG, JPG (Max 500MB)</p>
              </div>
            )}
          </div>
        </div>
        <button
          id="scan-deepfake-btn"
          onClick={() => { if (file) checkDeepfake(file); }}
          disabled={loading || !file}
          className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded text-sm font-semibold transition-all duration-200 disabled:opacity-40 hover:brightness-110 active:scale-95"
          style={{ background: file && !loading ? '#d8e3fb' : 'rgba(210,220,248,0.1)', color: file && !loading ? '#081425' : '#909097', border: 'none' }}
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Scan Media
        </button>
      </div>
      {loading && (
        <div className="rounded-lg p-4" style={{ background: 'rgba(17, 28, 45, 0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 className="text-xs font-semibold tracking-instrument font-mono-geist mb-3" style={{ color: '#909097' }}>ANALYSIS LOG</h4>
          <ScanningAnimation label="Deep scanning media..." />
        </div>
      )}
      {error && <div className="rounded-lg p-4 text-sm" style={{ background: 'rgba(164,2,23,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ffb3ad' }}><strong>Error:</strong> {error}</div>}
      {result && !loading && <ResultCard result={result} />}
    </div>
  );
}
