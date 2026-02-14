import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Inisialisasi client di luar untuk performa, tapi cek validitasnya
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export async function POST(req: Request) {
  try {
    if (!supabase) {
      throw new Error("Koneksi Supabase tidak terkonfigurasi di .env.local");
    }

    const formData = await req.formData();
    const rawData = Object.fromEntries(formData.entries());

    // 1. Proses Upload Foto ke Bucket 'photos'
    const file = formData.get('foto') as File;
    let photoUrl = '';

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file);

      if (uploadError) throw new Error('Storage Error: ' + uploadError.message);

      const { data: urlData } = supabase.storage.from('photos').getPublicUrl(fileName);
      photoUrl = urlData.publicUrl;
    }

    // 2. Bersihkan data untuk Database
    const { foto, ...dataToInsert } = rawData as any;
    const finalData = { ...dataToInsert, foto_url: photoUrl };

    // 3. Simpan ke Tabel 'registrations'
    const { error: dbError } = await supabase
      .from('registrations')
      .insert([finalData]);

    if (dbError) throw new Error('Database Error: ' + dbError.message);

    return NextResponse.json({ message: 'Pendaftaran Berhasil Terkirim!' });
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}