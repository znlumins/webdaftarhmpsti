import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 1. Ambil file foto
    const file = formData.get('foto') as File;
    let foto_url = '';

    // 2. Upload Foto ke Supabase Storage (jika ada)
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('foto-pendaftar') // Sesuaikan nama bucket tadi
        .upload(fileName, file);

      if (uploadError) throw new Error(`Gagal upload foto: ${uploadError.message}`);
      
      // Ambil Public URL agar bisa dilihat
      const { data: urlData } = supabase.storage
        .from('foto-pendaftar')
        .getPublicUrl(fileName);
        
      foto_url = urlData.publicUrl;
    }

    // 3. Masukkan Data Teks ke Database
    const { error: dbError } = await supabase
      .from('pendaftar')
      .insert([{
        nama: formData.get('nama'),
        nim: formData.get('nim'),
        prodi: formData.get('prodi'),
        angkatan: formData.get('angkatan'),
        jenis_kelamin: formData.get('jenis_kelamin'),
        agama: formData.get('agama'),
        tempat_lahir: formData.get('tempat_lahir'),
        tanggal_lahir: formData.get('tanggal_lahir'), // Pastikan format YYYY-MM-DD
        hp: formData.get('hp'),
        email: formData.get('email'),
        id_line_ig: formData.get('id_line_ig'),
        foto_url: foto_url,
        
        pengalaman_organisasi: formData.get('pengalaman_organisasi'),
        pengalaman_kepanitiaan: formData.get('pengalaman_kepanitiaan'),
        rencana_ke_depan: formData.get('rencana_ke_depan'),
        
        pilihan_1: formData.get('pilihan_1'),
        alasan_1: formData.get('alasan_1'),
        pilihan_2: formData.get('pilihan_2'),
        alasan_2: formData.get('alasan_2'),
        
        swot_s: formData.get('swot_s'),
        swot_w: formData.get('swot_w'),
        swot_o: formData.get('swot_o'),
        swot_t: formData.get('swot_t'),
        
        ide_terobosan: formData.get('ide_terobosan'),
        pernyataan_komitmen: formData.get('pernyataan_komitmen'),
      }]);

    if (dbError) throw new Error(dbError.message);

    return NextResponse.json({ message: 'Pendaftaran Berhasil!' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}