import { useState } from 'react';
import type { ScanResult } from '../data/mockData';
import { mockTextResult, mockImageResult, mockDeepfakeResult } from '../data/mockData';

const BASE_URL = 'http://localhost:8000';
const USE_MOCK = true; // Set to false when backend is ready

function simulateDelay(ms = 1800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useTextChecker() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkText = async (text: string) => {
    setLoading(true); setError(null); setResult(null);
    try {
      if (USE_MOCK) { await simulateDelay(); setResult(mockTextResult); }
      else {
        const res = await fetch(`${BASE_URL}/check-text`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        setResult(await res.json());
      }
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Unknown error'); }
    finally { setLoading(false); }
  };

  return { result, loading, error, checkText };
}

export function useImageChecker() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkImage = async (file: File) => {
    setLoading(true); setError(null); setResult(null);
    try {
      if (USE_MOCK) { await simulateDelay(); setResult(mockImageResult); }
      else {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${BASE_URL}/check-image`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        setResult(await res.json());
      }
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Unknown error'); }
    finally { setLoading(false); }
  };

  return { result, loading, error, checkImage };
}

export function useDeepfakeDetector() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkDeepfake = async (file: File) => {
    setLoading(true); setError(null); setResult(null);
    try {
      if (USE_MOCK) { await simulateDelay(2400); setResult(mockDeepfakeResult); }
      else {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`${BASE_URL}/check-deepfake`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        setResult(await res.json());
      }
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Unknown error'); }
    finally { setLoading(false); }
  };

  return { result, loading, error, checkDeepfake };
}
