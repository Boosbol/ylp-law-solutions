
-- Create table for case studies
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client TEXT NOT NULL,
  year TEXT NOT NULL,
  duration TEXT NOT NULL,
  dispute_value TEXT NOT NULL,
  status TEXT NOT NULL,
  case_number TEXT NOT NULL,
  description TEXT NOT NULL,
  results JSONB NOT NULL DEFAULT '[]'::jsonb,
  challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
  solutions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.admin_users(id)
);

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Create policies for case_studies
CREATE POLICY "Anyone can view case studies" 
  ON public.case_studies 
  FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated admins can insert case studies" 
  ON public.case_studies 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update case studies" 
  ON public.case_studies 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Authenticated admins can delete case studies" 
  ON public.case_studies 
  FOR DELETE 
  USING (true);

-- Insert existing case studies data
INSERT INTO public.case_studies (title, category, client, year, duration, dispute_value, status, case_number, description, results, challenges, solutions) VALUES
(
  'Kasus Pembunuhan Pedagang Baju Butik Auriell di Karawaci, Tangerang',
  'Hukum Pidana',
  'Keluarga Korban (bekerjasama dengan Hotman 911)',
  '2024',
  '8 bulan',
  'Kasus Pembunuhan',
  'Banding Disetujui',
  '793/Pid.B/2024/PN.Tng | 106/PID/2024/PT BTN',
  'Berhasil menangani kasus pembunuhan di Boutique Aurel Mode dengan mendampingi keluarga korban. Terdakwa Nada Diana divonis 15 tahun penjara di Pengadilan Negeri, kemudian dikurangi menjadi 13 tahun di Pengadilan Tinggi Banten.',
  '["Terdakwa terbukti melanggar Pasal 338 KUHP", "Vonis awal 15 tahun penjara (PN Tangerang)", "Vonis banding 13 tahun penjara (PT Banten)", "Proses kasasi sedang berjalan oleh JPU"]'::jsonb,
  '["Kasus pembunuhan dengan korban jiwa", "Proses hukum yang panjang dan kompleks", "Koordinasi dengan Hotman 911", "Dampak emosional pada keluarga korban"]'::jsonb,
  '["Pendampingan hukum yang komprehensif", "Koordinasi strategis dengan tim Hotman 911", "Dukungan psikologis untuk keluarga", "Strategi banding yang efektif"]'::jsonb
),
(
  'Gugatan Wanprestasi PT. Vinmix Multi Perkasa',
  'Hukum Perdata',
  'PT. Vinmix Multi Perkasa',
  '2024',
  '6 bulan',
  'IDR 326 juta',
  'Mediasi Berhasil',
  '229/Pdt.G/2024/PN.Ckr',
  'Menyelesaikan sengketa wanprestasi kontrak pengadaan beton senilai 1,3 miliar dengan anggota DPRD Jawa Barat. Kasus diselesaikan melalui mediasi dengan kesepakatan cicilan selama 9 bulan.',
  '["Penyelesaian melalui mediasi berhasil", "Akta Perdamaian ditandatangani 13 Januari 2025", "Kesepakatan cicilan Rp 45 juta selama 9 bulan", "Jaminan tanah SHM tetap berlaku"]'::jsonb,
  '["Sisa hutang Rp 326 juta dari kontrak 1,3 miliar", "Melibatkan pejabat publik (anggota DPRD)", "Jaminan berupa 2 sertifikat tanah", "Proyek infrastruktur yang terhenti"]'::jsonb,
  '["Pendekatan mediasi yang konstruktif", "Negosiasi jadwal pembayaran realistis", "Mempertahankan jaminan sebagai pengaman", "Komunikasi yang baik antar pihak"]'::jsonb
);
