'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [msg, setMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      setMsg('Mission Accomplished! Data berhasil terkirim.');
      formElement.reset(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  }

  // --- KOMPONEN INPUT RESPONSIF ---
  const InputText = ({ label, name, type = "text", req = false, placeholder = "" }: any) => (
    <div className="mb-5 md:mb-6 group">
      <label className="block text-[10px] md:text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase transition-colors group-hover:text-cyan-300">
        {label} {req && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input 
          name={name} 
          type={type} 
          required={req} 
          placeholder={placeholder} 
          className="w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-3 md:p-4 text-sm md:text-base text-white placeholder-gray-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] outline-none transition-all duration-300" 
        />
        {/* Dekorasi sudut hanya muncul di layar md ke atas biar rapi di HP */}
        <div className="hidden md:block absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-600 rounded-tr group-hover:border-cyan-500 transition-colors"></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-600 rounded-bl group-hover:border-cyan-500 transition-colors"></div>
      </div>
    </div>
  );

  const TextArea = ({ label, name, rows = 3, placeholder = "" }: any) => (
    <div className="mb-5 md:mb-6 group">
      <label className="block text-[10px] md:text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase transition-colors group-hover:text-cyan-300">
        {label}
      </label>
      <div className="relative">
        <textarea 
          name={name} 
          rows={rows} 
          placeholder={placeholder} 
          className="w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-3 md:p-4 text-sm md:text-base text-white placeholder-gray-600 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] outline-none transition-all duration-300"
        ></textarea>
        <div className="hidden md:block absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-700 rounded-br m-1 group-hover:border-cyan-500 transition-colors"></div>
      </div>
    </div>
  );

  const DepartemenOptions = () => (
    <>
      <option value="" disabled selected className="bg-gray-900 text-gray-500">-- SELECT DEPARTMENT --</option>
      <option value="BADAN PENGURUS HARIAN" className="bg-gray-900 font-bold text-yellow-400">★ BADAN PENGURUS HARIAN</option>
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
    <main className="min-h-screen bg-[#030303] text-white py-8 md:py-12 px-3 md:px-4 font-sans relative overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}>
      </div>
      {/* Orb Animation - Diperkecil di mobile agar tidak menutupi konten */}
      <div className="fixed top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-600 rounded-full blur-[100px] md:blur-[150px] opacity-20 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-700 rounded-full blur-[100px] md:blur-[150px] opacity-20 animate-pulse delay-1000"></div>

      {/* MAIN CONTAINER */}
      <div className={`w-full max-w-4xl mx-auto relative z-10 transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Responsive Glass Card: Padding lebih kecil di mobile (p-5), lebih besar di desktop (p-12) */}
        <div className="bg-[#0f0f0f]/60 backdrop-blur-xl border border-white/10 p-5 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>

          {/* HEADER */}
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-block px-3 py-1 mb-4 border border-cyan-500/30 rounded-full bg-cyan-500/10 backdrop-blur-md">
              <span className="text-[10px] md:text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase">Open Recruitment System</span>
            </div>
            {/* Ukuran Font Responsif: text-3xl di HP, text-6xl di Desktop */}
            <h1 className="text-3xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg leading-tight">
              KABINET <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">INNOVARA</span>
            </h1>
            <h2 className="text-sm md:text-xl font-medium text-gray-400 tracking-wide">PENGURUS HMPSTI 2026</h2>
          </div>

          {/* STATUS NOTIFICATION */}
          {status && (
            <div className={`p-4 rounded-xl mb-8 text-center border-l-4 shadow-lg animate-fade-in-down ${status === 'success' ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
              <p className="font-bold text-lg">{status === 'success' ? 'SUCCESS' : 'ERROR'}</p>
              <p className="text-sm opacity-90">{msg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
            
            {/* BAGIAN 1: Data Diri */}
            <section className="relative">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-800 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] shrink-0">
                  <span className="font-black text-lg md:text-xl text-white">01</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">PERSONAL DATA</h3>
                  <p className="text-xs md:text-sm text-gray-500">Identitas diri calon pengurus.</p>
                </div>
              </div>
              
              {/* Grid 1 kolom di HP, 2 kolom di md (Tablet/Desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputText label="Nama Lengkap" name="nama" req={true} placeholder="Ex: Satria Baja Hitam" />
                <InputText label="NIM" name="nim" req={true} placeholder="2xxxxxxxxx" />
                <InputText label="Prodi" name="prodi" req={true} placeholder="Teknik Informatika" />
                <InputText label="Angkatan" name="angkatan" req={true} placeholder="2024" />
                
                <div className="mb-5 md:mb-6 group">
                  <label className="block text-[10px] md:text-xs font-bold text-cyan-400 mb-2 tracking-widest uppercase group-hover:text-cyan-300">Jenis Kelamin *</label>
                  <select name="jenis_kelamin" className="w-full bg-[#0a0a0a]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-3 md:p-4 text-sm md:text-base text-white focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all">
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

              {/* Upload Foto Container Responsive */}
              <div className="mt-2 p-1 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-cyan-900 hover:to-blue-900 transition-colors duration-500">
                <div className="bg-[#0a0a0a] rounded-xl p-4 md:p-6 border border-gray-800 border-dashed relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-cyan-500 transition-opacity"></div>
                  <label className="block text-xs md:text-sm font-bold text-gray-300 mb-2 uppercase text-center group-hover:text-cyan-400 transition-colors">Upload Foto 3x4 (Formal) *</label>
                  
                  {/* Input File Responsif */}
                  <div className="flex justify-center w-full">
                     <input type="file" name="foto" required accept="image/*" className="block w-full text-xs md:text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 md:file:py-3 md:file:px-6 file:rounded-full file:border-0 file:text-xs md:file:text-sm file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 transition-all cursor-pointer" />
                  </div>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6 md:my-8"></div>

            {/* BAGIAN 2: Pengalaman */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-600 to-pink-800 flex items-center justify-center shadow-[0_0_20px_rgba(192,38,211,0.5)] shrink-0">
                   <span className="font-black text-lg md:text-xl text-white">02</span>
                </div>
                <div>
                   <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">TRACK RECORD</h3>
                   <p className="text-xs md:text-sm text-gray-500">Rekam jejak dan pengalaman organisasi.</p>
                </div>
              </div>
              
              <TextArea label="Pengalaman Organisasi" name="pengalaman_organisasi" placeholder="Tuliskan pengalaman organisasi terdahulu..." />
              <TextArea label="Pengalaman Kepanitiaan / Prestasi" name="pengalaman_kepanitiaan" placeholder="Sebutkan kepanitiaan atau prestasi yang pernah diraih..." />
              <TextArea label="Rencana Organisasi Kedepan" name="rencana_ke_depan" placeholder="Apa rencana kontribusi kamu kedepan?" />
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6 md:my-8"></div>

            {/* BAGIAN 3: Pilihan Departemen */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-700 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.5)] shrink-0">
                   <span className="font-black text-lg md:text-xl text-white">03</span>
                 </div>
                 <div>
                   <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">DEPARTEMEN</h3>
                   <p className="text-xs md:text-sm text-gray-500">Pilih divisi sesuai minat & bakat.</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Pilihan 1 */}
                <div className="bg-[#111] p-5 md:p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                     <label className="font-bold text-yellow-500 uppercase tracking-wider text-sm">Pilihan Utama</label>
                     <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  </div>
                  <select name="pilihan_1" required className="w-full mb-4 p-3 md:p-4 rounded-xl bg-black border border-gray-700 text-sm md:text-base text-white focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all">
                    <DepartemenOptions />
                  </select>
                  <textarea name="alasan_1" rows={3} placeholder="Alasan memilih departemen ini..." className="w-full bg-black border border-gray-700 rounded-xl p-3 md:p-4 text-white focus:ring-1 focus:ring-yellow-500 outline-none text-sm transition-all"></textarea>
                </div>

                {/* Pilihan 2 */}
                <div className="bg-[#111] p-5 md:p-6 rounded-2xl border border-gray-800 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                     <label className="font-bold text-gray-400 group-hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Pilihan Kedua</label>
                  </div>
                  <select name="pilihan_2" required className="w-full mb-4 p-3 md:p-4 rounded-xl bg-black border border-gray-700 text-sm md:text-base text-white focus:ring-2 focus:ring-yellow-500/50 outline-none transition-all">
                    <DepartemenOptions />
                  </select>
                  <textarea name="alasan_2" rows={3} placeholder="Alasan memilih departemen ini..." className="w-full bg-black border border-gray-700 rounded-xl p-3 md:p-4 text-white focus:ring-1 focus:ring-yellow-500 outline-none text-sm transition-all"></textarea>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6 md:my-8"></div>

            {/* BAGIAN 4: Analisis SWOT */}
            <section>
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-600 to-emerald-800 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] shrink-0">
                   <span className="font-black text-lg md:text-xl text-white">04</span>
                 </div>
                 <div>
                   <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">SWOT ANALYSIS</h3>
                   <p className="text-xs md:text-sm text-gray-500">Analisis diri sendiri secara objektif.</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <TextArea label="Strengths (Kelebihan)" name="swot_s" rows={3} />
                <TextArea label="Weaknesses (Kelemahan)" name="swot_w" rows={3} />
                <TextArea label="Opportunities (Peluang)" name="swot_o" rows={3} />
                <TextArea label="Threats (Hambatan)" name="swot_t" rows={3} />
              </div>
            </section>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6 md:my-8"></div>

            {/* BAGIAN 5: Ide & Komitmen */}
            <section>
               <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-red-600 to-rose-800 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.5)] shrink-0">
                   <span className="font-black text-lg md:text-xl text-white">05</span>
                 </div>
                 <div>
                   <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">COMMITMENT</h3>
                   <p className="text-xs md:text-sm text-gray-500">Pernyataan komitmen & ide inovasi.</p>
                 </div>
              </div>

              <TextArea label="Ide Inovasi untuk HMPSTI" name="ide_terobosan" rows={4} placeholder="Jelaskan ide kreatifmu..." />
              
              <div className="mt-6 md:mt-8 p-6 md:p-8 border border-dashed border-gray-700 rounded-2xl md:rounded-3xl bg-[#080808] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg className="w-16 h-16 md:w-24 md:h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                </div>
                <label className="block text-xs md:text-sm text-gray-400 mb-6 text-center relative z-10 break-words">
                  Silahkan ketik ulang kalimat komitmen berikut dengan <b>SAMA PERSIS</b>:
                  <br/>
                  <span className="block mt-4 font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic text-base md:text-2xl leading-relaxed">"SAYA BERJANJI AKAN BERTANGGUNG JAWAB ATAS APAPUN YANG SAYA DAPATKAN SELAMA SAYA MENJADI PENGURUS HMPSTI"</span>
                </label>
                <input name="pernyataan_komitmen" required type="text" className="w-full bg-black border border-gray-700 rounded-xl p-4 md:p-5 text-center font-bold text-white text-sm md:text-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 outline-none transition-all relative z-10" placeholder="Ketik kalimat janji di sini..." />
              </div>
            </section>

            {/* BUTTON SUBMIT */}
            <div className="pt-4 md:pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full group relative overflow-hidden rounded-2xl p-4 md:p-5 font-black text-lg md:text-xl tracking-widest transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] ${
                  loading 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white'
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                
                <span className="relative flex items-center justify-center gap-3">
                  {loading ? (
                    <>SENDING DATA...</>
                  ) : (
                    <>
                      SUBMIT APPLICATION 
                      <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    </>
                  )}
                </span>
              </button>
            </div>

            <p className="text-center text-[10px] md:text-xs text-gray-600 mt-4 tracking-wider uppercase">
              HMPSTI Cabinet Innovara 2026 Registration System • Powered by Supabase
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}