import { useRef, useState } from 'react';
import { useImageChecker } from '../hooks/useChecker';
import { ResultCard } from './ResultCard';
import { ScanningAnimation } from './ScanningAnimation';

export function ImageChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { result, loading, error, checkImage } = useImageChecker();

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: 'rgba(21, 32, 49, 0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          id="image-drop-zone"
          className="relative rounded-md transition-all duration-200 cursor-pointer overflow-hidden"
          style={{ border: `2px dashed ${dragging ? 'rgba(123,208,255,0.6)' : file ? 'rgba(123,208,255,0.25)' : 'rgba(255,255,255,0.12)'}`, background: dragging ? 'rgba(123,208,255,0.05)' : 'rgba(4, 14, 31, 0.6)', minHeight: '160px' }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept="image/*" className="sr-only" id="image-file-input" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="w-full rounded-md object-contain max-h-52" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md" style={{ background: 'rgba(4,14,31,0.7)' }}>
                <span className="text-sm" style={{ color: '#7bd0ff' }}>Change image</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: 'rgba(31,42,60,0.8)' }}>
                <svg className="w-7 h-7" style={{ color: '#909097' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: '#d8e3fb' }}>Drag & drop suspicious image</p>
                <p className="text-xs mt-1" style={{ color: '#909097' }}>or click to browse local files</p>
              </div>
              <p className="text-xs font-mono-geist" style={{ color: '#46464c' }}>PNG, JPG, WEBP · Max 10MB</p>
            </div>
          )}
        </div>
        {file && (
          <div className="flex items-center gap-2 mt-3 mb-2 px-1">
            <svg className="w-3.5 h-3.5" style={{ color: '#7bd0ff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-xs font-mono-geist truncate" style={{ color: '#7bd0ff' }}>{file.name}</span>
            <span className="text-xs ml-auto flex-shrink-0 font-mono-geist" style={{ color: '#46464c' }}>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        )}
        <button
          id="scan-image-btn"
          onClick={() => { if (file) checkImage(file); }}
          disabled={loading || !file}
          className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded text-sm font-semibold transition-all duration-200 disabled:opacity-40 hover:brightness-110 active:scale-95"
          style={{ background: file && !loading ? 'rgba(31, 42, 60, 0.9)' : 'rgba(31, 42, 60, 0.4)', border: '1px solid rgba(255,255,255,0.12)', color: '#d8e3fb' }}
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" />
          </svg>
          Scan Image
        </button>
      </div>
      {loading && <ScanningAnimation label="Analysing image..." />}
      {error && <div className="rounded-lg p-4 text-sm" style={{ background: 'rgba(164,2,23,0.2)', border: '1px solid rgba(239,68,68,0.3)', color: '#ffb3ad' }}><strong>Error:</strong> {error}</div>}
      {result && !loading && <ResultCard result={result} />}
    </div>
  );
}
