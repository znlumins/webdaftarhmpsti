'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [msg, setMsg] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Menggunakan useRef untuk referensi form yang lebih aman
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { setMounted(true); }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus('success');
      setMsg(data.message);
      
      // Reset form menggunakan ref agar aman dari async null
      if (formRef.current) formRef.current.reset();
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Helper Components
  const InputText = ({ label, name, type = "text", req = false }: any) => (
    <div className="mb-4">
      <label className="block text-[10px] font-bold text-cyan-400 mb-1 uppercase">{label} {req && '*'}</label>
      <input name={name} type={type} required={req} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-all" />
    </div>
  );

  const TextArea = ({ label, name }: any) => (
    <div className="mb-4">
      <label className="block text-[10px] font-bold text-cyan-400 mb-1 uppercase">{label}</label>
      <textarea name={name} rows={3} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none transition-all"></textarea>
    </div>
  );

  const DepartemenOptions = () => (
    <>
      <option value="" disabled>-- PILIH DEPARTEMEN --</option>
      <option value="PSDM">PSDM</option>
      <option value="Inovasi dan Teknologi">Inovasi dan Teknologi</option>
      <option value="Media dan Informasi">Media dan Informasi</option>
      <option value="Advokesma">Advokesma</option>
      <option value="Hubungan Eksternal">Hubungan Eksternal</option>
      <option value="Ekonomi Kreatif">Ekonomi Kreatif</option>
      <option value="Kreatifitas dan Olahraga">Kreatifitas dan Olahraga</option>
    </>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans">
      <div className={`max-w-4xl mx-auto transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        
        <div className="bg-[#0f0f0f] border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic">
              INNOVARA <span className="text-cyan-500">2026</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mt-2">HMPSTI Recruitment System</p>
          </header>

          {status && (
            <div className={`p-4 rounded-xl mb-6 text-center border ${status === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
              {msg}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* DATA DIRI */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText label="Nama Lengkap" name="nama" req />
              <InputText label="NIM" name="nim" req />
              <InputText label="Prodi" name="prodi" req />
              <InputText label="Angkatan" name="angkatan" req />
              <InputText label="HP/WA" name="hp" req />
              <InputText label="Email" name="email" type="email" req />
              <div className="col-span-full">
                <label className="block text-[10px] font-bold text-cyan-400 mb-1 uppercase">Upload Foto 3x4 *</label>
                <input type="file" name="foto" required accept="image/*" className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-cyan-600 file:text-white file:border-0" />
              </div>
            </section>

            {/* PILIHAN */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-yellow-500 block mb-2 uppercase">Pilihan 1</label>
                <select name="pilihan_1" defaultValue="" required className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm mb-2 outline-none">
                  <DepartemenOptions />
                </select>
                <textarea name="alasan_1" placeholder="Alasan..." className="w-full bg-black border border-gray-700 rounded-lg p-2 text-xs outline-none"></textarea>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <label className="text-xs font-bold text-gray-400 block mb-2 uppercase">Pilihan 2</label>
                <select name="pilihan_2" defaultValue="" required className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm mb-2 outline-none">
                  <DepartemenOptions />
                </select>
                <textarea name="alasan_2" placeholder="Alasan..." className="w-full bg-black border border-gray-700 rounded-lg p-2 text-xs outline-none"></textarea>
              </div>
            </section>

            {/* SWOT & KOMITMEN */}
            <section className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <InputText label="S" name="swot_s" />
                <InputText label="W" name="swot_w" />
                <InputText label="O" name="swot_o" />
                <InputText label="T" name="swot_t" />
              </div>
              <TextArea label="Ide Inovasi" name="ide_terobosan" />
              <div className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/20">
                <p className="text-[10px] text-gray-400 mb-2 italic">Ketik: "SAYA BERJANJI AKAN BERTANGGUNG JAWAB ATAS APAPUN YANG SAYA DAPATKAN SELAMA SAYA MENJADI PENGURUS HMPSTI"</p>
                <input name="pernyataan_komitmen" required className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm focus:border-cyan-500 outline-none" />
              </div>
            </section>

            <button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-cyan-900/20">
              {loading ? 'MEMPROSES...' : 'KIRIM PENDAFTARAN'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}