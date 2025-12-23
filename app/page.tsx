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

    const formData = {
      nama: e.target.nama.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
      alasan: e.target.alasan.value,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setStatus('success');
      setMsg('Terima kasih! Data Anda berhasil dikirim.');
      e.target.reset(); // Kosongkan form
    } catch (err: any) {
      setStatus('error');
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Form Pendaftaran
        </h1>

        {status === 'success' && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="nama" type="text" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800" placeholder="Budi Santoso" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input name="email" type="email" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800" placeholder="budi@contoh.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input name="whatsapp" type="tel" required className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800" placeholder="08123456789" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Mendaftar</label>
            <textarea name="alasan" className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800" rows={3} placeholder="Ceritakan alasanmu..."></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded-lg transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Mengirim...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </main>
  );
}