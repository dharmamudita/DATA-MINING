import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";

function generatePdfDoc(data: any) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const isRisk = Number(data.prediction) === 1;

  // 1. Top Header Banner (Deep Crimson #7D0404)
  doc.setFillColor(125, 4, 4);
  doc.rect(0, 0, pageWidth, 28, "F");

  // Header Brand & Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("HEARTGUARD AI", 14, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("SISTEM PENAPISAN MEDIS & DETEKSI DINI RISIKO KARDIOVASKULAR", 14, 20);

  // Document ID & Date on Right
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(`ID DOKUMEN: ${data.id || "SCR-2026"}`, pageWidth - 14, 12, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`TANGGAL: ${data.date || "27 Agu 2026"}`, pageWidth - 14, 18, { align: "right" });

  // 2. Title Section
  let y = 38;
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("LEMBAR HASIL SKRINING RISIKO KARDIOVASKULAR", 14, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Hasil analisis prediktif berbasis machine learning (Random Forest Classifier • Akurasi 89.96% • Dataset CDC BRFSS)",
    14,
    y + 5
  );

  // 3. Status Result Card (Highlighted Box)
  y = 50;
  if (isRisk) {
    // Red Alert Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.roundedRect(14, y, pageWidth - 28, 24, 3, 3, "FD");

    doc.setTextColor(153, 27, 27);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("STATUS: TERINDIKASI RISIKO TINGGI PENYAKIT JANTUNG", 20, y + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(127, 29, 29);
    doc.text(
      `Tingkat Probabilitas Risiko: ${(Number(data.probability || 0.85) * 100).toFixed(1)}% • Teridentifikasi kombinasi faktor risiko klinis signifikan.`,
      20,
      y + 17
    );
  } else {
    // Green Safe Box
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(16, 185, 129);
    doc.roundedRect(14, y, pageWidth - 28, 24, 3, 3, "FD");

    doc.setTextColor(6, 95, 70);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("STATUS: TIDAK TERINDIKASI RISIKO TINGGI (STABIL)", 20, y + 9);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(4, 120, 87);
    doc.text(
      `Tingkat Probabilitas Keyakinan: ${(Number(data.probability || 0.95) * 100).toFixed(1)}% • Profil biometrik dan gaya hidup dalam rentang terkontrol.`,
      20,
      y + 17
    );
  }

  // 4. Patient Information Table Section
  y = 82;
  doc.setTextColor(125, 4, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("A. PROFIL & BIOMETRIK PASIEN", 14, y);

  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, pageWidth - 28, 42, "FD");

  // Grid Lines
  doc.line(14, y + 14, pageWidth - 14, y + 14);
  doc.line(14, y + 28, pageWidth - 14, y + 28);
  doc.line(pageWidth / 2, y, pageWidth / 2, y + 42);

  // Table Data Row 1
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Nama Pasien:", 18, y + 6);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.patientName || "Pasien Mandiri", 18, y + 10);

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Kategori Usia:", pageWidth / 2 + 6, y + 6);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.age || "50-54 Tahun", pageWidth / 2 + 6, y + 10);

  // Table Data Row 2
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Jenis Kelamin:", 18, y + 20);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.sex || "Pria", 18, y + 24);

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Indeks Massa Tubuh (BMI):", pageWidth / 2 + 6, y + 20);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`${Number(data.bmi || 24.5).toFixed(1)} kg/m²`, pageWidth / 2 + 6, y + 24);

  // Table Data Row 3
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Riwayat Hipertensi (Tensi Tinggi):", 18, y + 34);
  doc.setTextColor(data.highBP === "Ya" ? 153 : 15, data.highBP === "Ya" ? 27 : 23, data.highBP === "Ya" ? 27 : 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.highBP || "Tidak", 18, y + 38);

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Riwayat Kolesterol Tinggi:", pageWidth / 2 + 6, y + 34);
  doc.setTextColor(data.highChol === "Ya" ? 153 : 15, data.highChol === "Ya" ? 27 : 23, data.highChol === "Ya" ? 27 : 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(data.highChol || "Tidak", pageWidth / 2 + 6, y + 38);

  // 5. Machine Learning Analysis Section
  y = 136;
  doc.setTextColor(125, 4, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("B. EVALUASI MODEL & PARAMETER DATA MINING", 14, y);

  y += 4;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, pageWidth - 28, 30, "FD");

  doc.setTextColor(30, 41, 59);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("• Algoritma Prediksi: Random Forest Classifier (Trained with 21 clinical & socio-demographic features)", 18, y + 7);
  doc.text("• Metrik Evaluasi: Akurasi Pengujian 89.96% | Nilai ROC-AUC 0.7712", 18, y + 14);
  doc.text("• Segmentasi K-Means: klasterisasi faktor risiko berdasarkan pola epidemiologis CDC BRFSS", 18, y + 21);

  // 6. Clinical Recommendation Section
  y = 178;
  doc.setTextColor(125, 4, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("C. REKOMENDASI KLINIS & INTERVENSI GAYA HIDUP", 14, y);

  y += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, y, pageWidth - 28, 38, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.8);
  const recLines = doc.splitTextToSize(
    data.recommendation ||
      "Lakukan pemeriksaan profil lipid rutin, pertahankan aktivitas fisik kardio minimal 150 menit per minggu, dan konsultasikan hasil penapisan ini dengan dokter spesialis jantung profesional.",
    pageWidth - 40
  );
  doc.text(recLines, 18, y + 8);

  // 7. Academic Credits & Sign-off
  y = 226;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, y, pageWidth - 28, 26, 2, 2, "FD");

  doc.setTextColor(125, 4, 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("TIM PENGEMBANG & AKADEMIK:", 18, y + 6);

  doc.setTextColor(51, 65, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.text("• Dharma Mudita (23312067) • Wildan Pratama (23312024) • Farhan Almasyah Nuryadi (25312110)", 18, y + 12);
  doc.text("• Dosen Pengampu: Nirwana Hendrastuty, S.Kom., M.Cs. • Program Studi Informatika (Data Mining SP)", 18, y + 18);

  // 8. Bottom Medical Disclaimer
  y = 260;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, pageWidth - 14, y);

  doc.setTextColor(148, 163, 184);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.2);
  doc.text(
    "DISCLAIMER MEDIS: Dokumen ini diterbitkan oleh sistem kecerdasan buatan HeartGuard AI untuk keperluan penapisan awal, edukasi klinis, dan tugas akhir akademis. Dokumen ini BUKAN pengganti diagnosis medis resmi dari dokter spesialis kardiovaskular tersertifikasi.",
    14,
    y + 5,
    { maxWidth: pageWidth - 28 }
  );

  return doc;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = {
      id: searchParams.get("id") || "SCR-2026",
      date: searchParams.get("date") || "27 Agu 2026",
      patientName: searchParams.get("name") || "Pasien Mandiri",
      age: searchParams.get("age") || "50-54 Tahun",
      sex: searchParams.get("sex") || "Pria",
      bmi: parseFloat(searchParams.get("bmi") || "24.5"),
      highBP: searchParams.get("highBP") || "Tidak",
      highChol: searchParams.get("highChol") || "Tidak",
      prediction: parseInt(searchParams.get("prediction") || "0", 10),
      probability: parseFloat(searchParams.get("probability") || "0.95"),
      recommendation: searchParams.get("rec") || "Pertahankan gaya hidup sehat dan lakukan pemeriksaan berkala.",
    };

    const doc = generatePdfDoc(data);
    const pdfArrayBuffer = doc.output("arraybuffer");
    const cleanId = data.id.replace(/[^a-zA-Z0-9]/g, "");

    const isInline = searchParams.get("view") === "true";
    const disposition = isInline
      ? `inline; filename="HeartGuard_Rekap_${cleanId}.pdf"`
      : `attachment; filename="HeartGuard_Rekap_${cleanId}.pdf"`;

    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
        "Content-Length": pdfArrayBuffer.byteLength.toString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Gagal membuat PDF" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const doc = generatePdfDoc(data);
    const pdfArrayBuffer = doc.output("arraybuffer");
    const cleanId = (data.id || "SCR2026").replace(/[^a-zA-Z0-9]/g, "");

    return new NextResponse(pdfArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="HeartGuard_Rekap_${cleanId}.pdf"`,
        "Content-Length": pdfArrayBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Gagal membuat dokumen PDF." }, { status: 500 });
  }
}
