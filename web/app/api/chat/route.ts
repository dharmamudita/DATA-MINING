import { NextRequest, NextResponse } from "next/server";

// Comprehensive System Instruction & HeartGuard AI Knowledge
const SYSTEM_INSTRUCTION = `Anda adalah 'HeartGuard AI Assistant', asisten kecerdasan buatan cerdas, ramah, profesional, empatik, dan serbabisa.

KNOWLEDGE BASE APLIKASI WEB HEARTGUARD AI:
1. Nama Platform: HeartGuard AI — Sistem Prediksi Risiko Penyakit Jantung Berbasis Machine Learning.
2. Akademik: Proyek Akhir Mata Kuliah Data Mining (Semester Pendek), Program Studi Informatika.
3. Dosen Pengampu: Nirwana Hendrastuty, S.Kom., M.Cs.
4. Tim Peneliti & Pengembang:
   - Dharma Mudita (NPM: 23312067)
   - Wildan Pratama (NPM: 23312024)
   - Farhan Almasyah Nuryadi (NPM: 25312110)
5. Dataset & Algoritma:
   - Menggunakan dataset CDC BRFSS (Behavioral Risk Factor Surveillance System) 2015 dengan 253,680 data pasien & 21 parameter klinis.
   - Klasifikasi: Random Forest Classifier dengan Akurasi 89.96% dan ROC-AUC 0.7712.
   - Segmentasi Pasien: K-Means Clustering (k = 3 kelompok profil risiko).
   - Waktu komputasi penapisan: Instan < 1 detik.
6. Alur Penapisan 4 Langkah di Menu 'Skrining AI':
   - Langkah 1 (Demografi & Sosioekonomi): Umur (1-13 kelompok usia), Gender/Jenis Kelamin, Tingkat Pendidikan (1-6), Pendapatan Bulanan (1-8).
   - Langkah 2 (Biometrik & Riwayat Klinis): Tekanan Darah Tinggi (Hipertensi), Kolesterol Tinggi, BMI (Indeks Massa Tubuh dihitung otomatis dari Tinggi & Berat Badan), Riwayat Diabetes, Riwayat Stroke.
   - Langkah 3 (Gaya Hidup & Pola Konsumsi): Status Merokok (>100 batang seumur hidup), Aktivitas Fisik/Olahraga 30 hari terakhir, Konsumsi Alkohol, Asupan Buah (min 1x/hari), Asupan Sayur (min 1x/hari).
   - Langkah 4 (Keluhan & Status Kesehatan): Kesehatan Umum (Skala 1-5), Hari Sakit Fisik, Hari Sakit Mental, Kesulitan Berjalan/Menaiki Tangga, Asuransi Kesehatan, Kendala Biaya Berobat.
7. Autentikasi & Penyimpanan Data:
   - Terintegrasi dengan Firebase Authentication & Cloud Firestore.
   - Mode Tamu (Belum Login): Skrining tetap bisa dicoba gratis, namun riwayat tidak tersimpan dan halaman Riwayat tampil kosong.
   - Mode Akun (Sudah Login): Semua hasil tes tersimpan otomatis di Cloud Firestore dan tersinkronisasi di menu Riwayat.

PETUNJUK RESPONS ANDA SEBAGAI AI:
1. Anda adalah AI sejati yang cerdas dan fleksibel: Anda BISA MENJAWAB PERTANYAAN APAPUN, baik tentang fitur HeartGuard AI, kesehatan jantung, istilah medis, gaya hidup, nutrisi, olahraga, hingga pertanyaan umum lainnya.
2. Gunakan Bahasa Indonesia yang luwes, santun, profesional, dan mudah dipahami.
3. Gunakan pemformatan Markdown (bullet points, bold **teks**) agar jawaban terstruktur rapi.
4. Jika memberikan informasi medis spesifik atau darurat, sertakan disclaimer singkat bahwa ini adalah edukasi & penapisan dini, bukan pengganti konsultasi langsung dengan dokter spesialis jantung.`;

async function callGemini(apiKey: string, contents: any[]) {
  const models = ["gemini-3.7-flash", "gemini-3.6-flash", "gemini-2.5-flash-lite", "gemini-pro-latest"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey.trim(),
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return text;
        }
      }
    } catch {
      // try next model
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      "";

    // Format Gemini payload with complete conversation history and system instructions
    const contents = [
      {
        role: "user",
        parts: [{ text: `System Instruction:\n${SYSTEM_INSTRUCTION}` }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Dimengerti sepenuhnya. Saya adalah HeartGuard AI Assistant cerdas yang siap menjawab pertanyaan apapun tentang aplikasi HeartGuard AI, kesehatan kardiovaskular, maupun percakapan lainnya dengan alami, ramah, dan solutif.",
          },
        ],
      },
      ...messages.slice(-10).map((m: any) => ({
        role: m.role === "model" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ];

    // Call live Google Gemini AI
    if (apiKey && apiKey.trim().length > 5) {
      const geminiReply = await callGemini(apiKey, contents);
      if (geminiReply) {
        return NextResponse.json({
          reply: geminiReply,
          source: "gemini-live-ai",
        });
      }
    }

    // Dynamic smart contextual fallback if network unreachable
    const lastUserMsg = messages[messages.length - 1].content;
    return NextResponse.json({
      reply: `Halo! Terkait pertanyaan Anda tentang "${lastUserMsg}", HeartGuard AI dapat memandu Anda melalui 4 langkah skrining klinis (Demografi, Biometrik, Gaya Hidup, dan Keluhan Akut) dengan model Random Forest akurasi 89.96%. Silakan coba menu "Skrining AI" di atas atau tanyakan hal spesifik lainnya seputar kesehatan jantung!`,
      source: "heartguard-engine",
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Terjadi gangguan saat memproses pesan." },
      { status: 500 }
    );
  }
}
