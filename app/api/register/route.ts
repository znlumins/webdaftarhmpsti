import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, whatsapp, alasan } = body;

    // 1. Validasi sederhana
    if (!nama || !email || !whatsapp) {
      return NextResponse.json(
        { message: 'Nama, Email, dan WA wajib diisi!' }, 
        { status: 400 }
      );
    }

    // 2. Masukkan ke Supabase
    const { data, error } = await supabase
      .from('pendaftar')
      .insert([
        { nama, email, whatsapp, alasan },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: 'Pendaftaran berhasil!', data }, 
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Terjadi kesalahan server' }, 
      { status: 500 }
    );
  }
}