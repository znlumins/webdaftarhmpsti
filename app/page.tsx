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

    // Gunakan FormData untuk handle file upload
    const formElement = e.target;
    const formData = new FormData(formElement);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formData, // Jangan di-JSON.stringify karena ada file
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus('success');
      setMsg('Alhamdulillah! Pendaftaran berhasil dikirim.');
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

  // Komponen input biar kodingan rapi
  const InputText = ({ label, name, type = "text", req = false, placeholder = "" }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label} {req && <span className="text-red-500">*</span>}</label>
      <input name={name} type={type} required={req} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 bg-white" />
    </div>
  );

  const TextArea = ({ label, name, rows = 3, placeholder = "" }: any) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <textarea name={name} rows={rows} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 bg-white"></textarea>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-600">
        
        {/* Header sesuai PDF */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">FORMULIR PENDAFTARAN</h1>
          <h2 className="text-xl font-bold text-blue-600">PENGURUS HIMATIKA 2025</h2>
          <p className="text-sm text-gray-500 mt-2">Silahkan isi data dengan lengkap dan jujur</p>
        </div>

        {/* Notifikasi */}
        {status && (
          <div className={`p-4 rounded-lg mb-6 text-center font-medium ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* BAGIAN 1: Data Diri */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">I. DATA DIRI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputText label="Nama Lengkap" name="nama" req={true} />
              <InputText label="NIM" name="nim" req={true} />
              <InputText label="Prodi" name="prodi" req={true} />
              <InputText label="Angkatan" name="angkatan" req={true} />
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Kelamin *</label>
                <select name="jenis_kelamin" className="w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-800">
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <InputText label="Agama" name="agama" req={true} />
              <InputText label="Tempat Lahir" name="tempat_lahir" req={true} />
              <InputText label="Tanggal Lahir" name="tanggal_lahir" type="date" req={true} />
              <InputText label="Nomor HP/WA" name="hp" type="tel" req={true} />
              <InputText label="Email" name="email" type="email" req={true} />
              <InputText label="ID Line / Instagram" name="id_line_ig" />
            </div>

            {/* Upload Foto */}
            <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Foto 3x4 (Wajib) *</label>
              <input type="file" name="foto" required accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
            </div>
          </section>

          {/* BAGIAN 2: Pengalaman */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">II. PENGALAMAN & PRESTASI</h3>
            <p className="text-xs text-gray-500 mb-2">*Tuliskan dalam bentuk daftar (Tahun - Nama Kegiatan - Jabatan)</p>
            
            <TextArea label="Pengalaman Organisasi" name="pengalaman_organisasi" placeholder="Contoh:&#10;2023 - OSIS SMA 1 - Sekretaris&#10;2024 - Klub Matematika - Anggota" />
            <TextArea label="Pengalaman Kepanitiaan / Prestasi" name="pengalaman_kepanitiaan" placeholder="Contoh:&#10;2024 - Juara 1 Olimpiade Matematika&#10;2023 - Ketua Panitia HUT RI" />
            <TextArea label="Rencana Organisasi / Kepanitiaan ke Depan" name="rencana_ke_depan" placeholder="Sebutkan kegiatan yang ingin diikuti tahun ini..." />
          </section>

          {/* BAGIAN 3: Pilihan Divisi */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">III. PILIHAN DIVISI</h3>
            <div className="bg-yellow-50 p-4 rounded mb-4 text-sm text-yellow-800">
              Opsi Divisi: MnB, Humas, PSDM, DaFas, Keilmuan
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded border">
                <label className="block font-bold mb-2">Pilihan Pertama *</label>
                <select name="pilihan_1" className="w-full mb-2 p-2 rounded border bg-white text-gray-800">
                  <option value="MnB">Minat Bakat (MnB)</option>
                  <option value="Humas">Humas</option>
                  <option value="PSDM">PSDM</option>
                  <option value="DaFas">Dana & Fasilitas</option>
                  <option value="Keilmuan">Keilmuan</option>
                </select>
                <TextArea label="Alasan Memilih" name="alasan_1" rows={3} />
              </div>

              <div className="bg-gray-50 p-4 rounded border">
                <label className="block font-bold mb-2">Pilihan Kedua *</label>
                <select name="pilihan_2" className="w-full mb-2 p-2 rounded border bg-white text-gray-800">
                  <option value="MnB">Minat Bakat (MnB)</option>
                  <option value="Humas">Humas</option>
                  <option value="PSDM">PSDM</option>
                  <option value="DaFas">Dana & Fasilitas</option>
                  <option value="Keilmuan">Keilmuan</option>
                </select>
                <TextArea label="Alasan Memilih" name="alasan_2" rows={3} />
              </div>
            </div>
          </section>

          {/* BAGIAN 4: Analisis SWOT */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">IV. ANALISIS SWOT DIRI SENDIRI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextArea label="Strength (Kelebihan)" name="swot_s" rows={3} />
              <TextArea label="Weakness (Kelemahan)" name="swot_w" rows={3} />
              <TextArea label="Opportunity (Peluang)" name="swot_o" rows={3} />
              <TextArea label="Threat (Ancaman)" name="swot_t" rows={3} />
            </div>
          </section>

          {/* BAGIAN 5: Ide & Komitmen */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">V. KOMITMEN</h3>
            <TextArea label="Ide / Terobosan untuk HIMATIKA ke depan" name="ide_terobosan" rows={4} />
            
            <div className="mt-6 p-4 border-2 border-dashed border-gray-400 rounded bg-gray-50">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Silahkan ketik ulang kalimat berikut sebagai tanda janji:
                <br/>
                <span className="italic text-red-600">"SAYA BERJANJI AKAN BERTANGGUNG JAWAB ATAS APAPUN YANG SAYA DAPATKAN SELAMA SAYA MENJADI PENGURUS HIMATIKA"</span>
              </label>
              <input name="pernyataan_komitmen" required type="text" className="w-full border border-gray-300 rounded p-2 text-center font-bold text-gray-800 bg-white" placeholder="Ketik ulang kalimat di atas disini..." />
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold text-lg py-4 px-4 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02] ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
            }`}
          >
            {loading ? 'Sedang Mengirim Data...' : 'KIRIM FORMULIR PENDAFTARAN'}
          </button>

        </form>
      </div>
    </main>
  );
}