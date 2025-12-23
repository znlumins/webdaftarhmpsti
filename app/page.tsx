'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formElement = e.target;
    const formData = new FormData(formElement);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus('success');
      setMsg('Success! Data pendaftaran berhasil terkirim ke server.');
      formElement.reset(); 
      window.scrollTo(0, 0);
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  }

  // --- KOMPONEN INPUT VERSI DARK MODE ---
  const InputText = ({ label, name, type = "text", req = false, placeholder = "" }: any) => (
    <div className="mb-5">
      <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wide uppercase">
        {label} {req && <span className="text-red-500">*</span>}
      </label>
      <input 
        name={name} 
        type={type} 
        required={req} 
        placeholder={placeholder} 
        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300" 
      />
    </div>
  );

  const TextArea = ({ label, name, rows = 3, placeholder = "" }: any) => (
    <div className="mb-5">
      <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wide uppercase">
        {label}
      </label>
      <textarea 
        name={name} 
        rows={rows} 
        placeholder={placeholder} 
        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300"
      ></textarea>
    </div>
  );

  // Opsi Departemen (Sesuai Gambar)
  const DepartemenOptions = () => (
    <>
      <option value="" disabled selected className="bg-gray-900 text-gray-400">-- Pilih Departemen --</option>
      <option value="PSDM" className="bg-gray-900">PSDM</option>
      <option value="Inovasi dan Teknologi" className="bg-gray-900">Inovasi dan Teknologi</option>
      <option value="Media dan Informasi Digital" className="bg-gray-900">Media dan Informasi Digital</option>
      <option value="Advokesma" className="bg-gray-900">Advokesma</option>
      <option value="Hubungan Eksternal" className="bg-gray-900">Hubungan Eksternal</option>
      <option value="Ekonomi Kreatif" className="bg-gray-900">Ekonomi Kreatif</option>
      <option value="Kreatifitas dan Olahraga" className="bg-gray-900">Kreatifitas dan Olahraga</option>
    </>
  );

  return (
    // Background Utama Hitam Pekat (Sesuai Landing Page)
    <main className="min-h-screen bg-[#050505] text-white py-12 px-4 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Container Form (Card Dark) */}
      <div className="max-w-4xl mx-auto bg-[#0f0f0f] p-8 md:p-12 rounded-2xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] border border-gray-800 relative overflow-hidden">
        
        {/* Dekorasi Glow di Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-600 rounded-full blur-[120px] opacity-5 pointer-events-none"></div>

        {/* HEADER INNOVARA */}
        <div className="text-center mb-12 relative z-10">
          <p className="text-sm text-gray-400 tracking-[0.2em] mb-2 font-bold uppercase">Open Recruitment</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
            KABINET <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">INNOVARA</span>
          </h1>
          <h2 className="text-xl font-bold text-gray-500 mb-6">PENGURUS HMPSTI 2026</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Notifikasi Status */}
        {status && (
          <div className={`p-4 rounded-lg mb-8 text-center border font-bold ${status === 'success' ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-red-900/30 border-red-500 text-red-400'}`}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
          
          {/* BAGIAN 1: Data Diri */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-2">
              <div className="w-8 h-8 rounded bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-white">DATA PRIBADI</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputText label="Nama Lengkap" name="nama" req={true} placeholder="Masukkan nama lengkap" />
              <InputText label="NIM" name="nim" req={true} placeholder="2xxxxxxxxx" />
              <InputText label="Prodi" name="prodi" req={true} placeholder="Teknik Informatika" />
              <InputText label="Angkatan" name="angkatan" req={true} placeholder="2024" />
              
              <div className="mb-5">
                <label className="block text-sm font-bold text-cyan-400 mb-2 tracking-wide uppercase">Jenis Kelamin *</label>
                <select name="jenis_kelamin" className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option value="Laki-laki" className="bg-gray-900">Laki-laki</option>
                  <option value="Perempuan" className="bg-gray-900">Perempuan</option>
                </select>
              </div>

              <InputText label="Agama" name="agama" req={true} />
              <InputText label="Tempat Lahir" name="tempat_lahir" req={true} />
              <InputText label="Tanggal Lahir" name="tanggal_lahir" type="date" req={true} />
              <InputText label="Nomor HP/WA" name="hp" type="tel" req={true} placeholder="08xxxxxxxx" />
              <InputText label="Email" name="email" type="email" req={true} placeholder="email@student.ub.ac.id" />
              <InputText label="ID Line / Instagram" name="id_line_ig" placeholder="@username" />
            </div>

            <div className="mt-4 bg-cyan-900/10 border border-cyan-800/30 p-6 rounded-xl border-dashed">
              <label className="block text-sm font-bold text-cyan-300 mb-2 uppercase">Upload Foto 3x4 (Formal) *</label>
              <input type="file" name="foto" required accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 transition-colors cursor-pointer" />
            </div>
          </section>

          {/* BAGIAN 2: Pengalaman */}
          <section>
             <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-2">
              <div className="w-8 h-8 rounded bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-white">TRACK RECORD</h3>
            </div>
            
            <TextArea label="Pengalaman Organisasi" name="pengalaman_organisasi" placeholder="Tahun - Organisasi - Jabatan" />
            <TextArea label="Pengalaman Kepanitiaan / Prestasi" name="pengalaman_kepanitiaan" placeholder="Tahun - Event - Posisi" />
            <TextArea label="Rencana Organisasi Kedepan" name="rencana_ke_depan" placeholder="Kegiatan apa yang ingin diikuti tahun ini..." />
          </section>

          {/* BAGIAN 3: Pilihan Departemen (Sesuai Gambar 2) */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-2">
              {/* Menggunakan warna Kuning/Emas sesuai gambar tombol Departemen */}
              <div className="w-8 h-8 rounded bg-yellow-900/50 text-yellow-400 flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold text-white">DEPARTEMEN CHOICE</h3>
            </div>

            <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-700/30 text-yellow-200 text-sm mb-6 flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <p className="mt-1">Pilih departemen yang paling sesuai dengan passion dan skill kamu. (Lihat referensi departemen di website)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilihan 1 */}
              <div className="bg-[#151515] p-6 rounded-xl border border-gray-800 hover:border-yellow-600/50 transition-colors group">
                <label className="block font-bold mb-3 text-yellow-500 group-hover:text-yellow-400 transition-colors uppercase tracking-wider">Pilihan Utama</label>
                <select name="pilihan_1" required className="w-full mb-4 p-3 rounded bg-[#0a0a0a] border border-gray-700 text-white focus:ring-2 focus:ring-yellow-500 outline-none">
                  <DepartemenOptions />
                </select>
                <textarea name="alasan_1" rows={3} placeholder="Jelaskan alasan memilih ini..." className="w-full bg-[#0a0a0a] border border-gray-700 rounded p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none text-sm"></textarea>
              </div>

              {/* Pilihan 2 */}
              <div className="bg-[#151515] p-6 rounded-xl border border-gray-800 hover:border-yellow-600/50 transition-colors group">
                <label className="block font-bold mb-3 text-gray-400 group-hover:text-yellow-400 transition-colors uppercase tracking-wider">Pilihan Kedua</label>
                <select name="pilihan_2" required className="w-full mb-4 p-3 rounded bg-[#0a0a0a] border border-gray-700 text-white focus:ring-2 focus:ring-yellow-500 outline-none">
                  <DepartemenOptions />
                </select>
                <textarea name="alasan_2" rows={3} placeholder="Jelaskan alasan memilih ini..." className="w-full bg-[#0a0a0a] border border-gray-700 rounded p-3 text-white focus:ring-1 focus:ring-yellow-500 outline-none text-sm"></textarea>
              </div>
            </div>
          </section>

          {/* BAGIAN 4: Analisis SWOT */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-2">
              <div className="w-8 h-8 rounded bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold">4</div>
              <h3 className="text-xl font-bold text-white">SWOT ANALYSIS</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea label="Strengths (Kelebihan)" name="swot_s" rows={3} />
              <TextArea label="Weaknesses (Kelemahan)" name="swot_w" rows={3} />
              <TextArea label="Opportunities (Peluang)" name="swot_o" rows={3} />
              <TextArea label="Threats (Hambatan)" name="swot_t" rows={3} />
            </div>
          </section>

          {/* BAGIAN 5: Ide & Komitmen */}
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-2">
              <div className="w-8 h-8 rounded bg-cyan-900 text-cyan-400 flex items-center justify-center font-bold">5</div>
              <h3 className="text-xl font-bold text-white">COMMITMENT</h3>
            </div>

            <TextArea label="Ide Inovasi untuk HMPSTI" name="ide_terobosan" rows={4} placeholder="Jelaskan ide kreatifmu..." />
            
            <div className="mt-8 p-6 border border-dashed border-gray-600 rounded-xl bg-[#151515]">
              <label className="block text-sm text-gray-400 mb-3 text-center">
                Silahkan ketik ulang kalimat komitmen berikut dengan <b>SAMA PERSIS</b>:
                <br/>
                <span className="block mt-2 font-bold text-cyan-400 italic text-lg">"SAYA BERJANJI AKAN BERTANGGUNG JAWAB ATAS APAPUN YANG SAYA DAPATKAN SELAMA SAYA MENJADI PENGURUS HMPSTI"</span>
              </label>
              <input name="pernyataan_komitmen" required type="text" className="w-full bg-black border border-gray-700 rounded-lg p-4 text-center font-bold text-white focus:border-cyan-500 outline-none" placeholder="Ketik kalimat janji di sini..." />
            </div>
          </section>

          {/* Tombol Submit ala Landing Page Innovara */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-extrabold text-xl py-5 px-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] ${
              loading 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-700 text-white hover:from-cyan-400 hover:to-blue-600'
            }`}
          >
            {loading ? 'SENDING DATA...' : 'SUBMIT APPLICATION NOW 🚀'}
          </button>

          <p className="text-center text-xs text-gray-600 mt-4">
            HMPSTI Cabinet Innovara 2026 Registration System
          </p>

        </form>
      </div>
    </main>
  );
}