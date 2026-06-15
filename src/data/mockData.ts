export interface ScanResult {
  danger_score: number;
  type: 'scam' | 'deepfake' | 'safe';
  scam_category: 'credit_card' | 'kyc' | 'crypto' | 'lottery' | 'job_fraud' | 'safe';
  red_flags: string[];
  explanation: string;
  precautions: string[];
  block_recommended: boolean;
  report_to: string;
}

export const mockTextResult: ScanResult = {
  danger_score: 87,
  type: 'scam',
  scam_category: 'kyc',
  red_flags: [
    'Urgent tone compelling immediate action',
    'Suspicious link structure (lookalike domain)',
    'Grammatical errors indicating non-native source',
    'Request for personal credentials',
  ],
  explanation: 'High probability of a social engineering attack designed to steal credentials. The provided URL uses a deceptive domain structure mimicking a legitimate bank portal.',
  precautions: [
    'Do not click any embedded links',
    'Block sender immediately',
    'Report to your bank directly',
    'Enable two-factor authentication on affected accounts',
  ],
  block_recommended: true,
  report_to: 'cybercrime.gov.in',
};

export const mockImageResult: ScanResult = {
  danger_score: 62,
  type: 'scam',
  scam_category: 'crypto',
  red_flags: ['Edited EXIF data detected', 'Inconsistent shadow direction', 'Metadata timestamp mismatch'],
  explanation: 'Image shows signs of digital manipulation. EXIF metadata has been stripped and recreated, a common tactic in fabricated screenshot scams related to fake crypto profits.',
  precautions: ['Verify source credibility through official channels', 'Run reverse image search', 'Do not send money based on this image'],
  block_recommended: false,
  report_to: 'cybercrime.gov.in',
};

export const mockDeepfakeResult: ScanResult = {
  danger_score: 94,
  type: 'deepfake',
  scam_category: 'safe',
  red_flags: ['Abnormal blink rate detected', 'Audio-visual desynchronization', 'AI artifacts in facial region', 'Unnatural micro-expression patterns'],
  explanation: 'High probability of synthetic media manipulation. Facial landmarks exhibit AI-generated characteristics. This video is likely created using a deepfake generation model.',
  precautions: ['Treat this media as fraudulent', 'Do not share or spread this content', 'Inform relevant authorities', 'Contact the person shown directly to verify'],
  block_recommended: true,
  report_to: 'cybercrime.gov.in',
};

export const scamCategoryLabels: Record<ScanResult['scam_category'], string> = {
  credit_card: 'Credit Card Fraud',
  kyc: 'KYC / Phishing',
  crypto: 'Crypto Scam',
  lottery: 'Lottery Scam',
  job_fraud: 'Job Fraud',
  safe: 'Safe',
};

export const typeLabels: Record<ScanResult['type'], string> = {
  scam: 'Scam',
  deepfake: 'Deepfake',
  safe: 'Safe',
};
