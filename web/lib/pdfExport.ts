export interface ScreeningReportData {
  id: string;
  date: string;
  patientName: string;
  age: string;
  sex: string;
  bmi: number;
  highBP: string;
  highChol: string;
  prediction: number;
  probability: number;
  status: string;
  recommendation: string;
  userEmail?: string;
}

export function exportScreeningPDF(data: ScreeningReportData) {
  const params = new URLSearchParams({
    id: data.id || "SCR-2026",
    name: data.patientName || "Pasien Mandiri",
    age: data.age || "50-54 Tahun",
    sex: data.sex || "Pria",
    bmi: (data.bmi || 24.5).toString(),
    highBP: data.highBP || "Tidak",
    highChol: data.highChol || "Tidak",
    prediction: (data.prediction ?? 0).toString(),
    probability: (data.probability ?? 0.95).toString(),
    date: data.date || "27 Agu 2026",
    rec: data.recommendation || "Pertahankan gaya hidup sehat dan lakukan evaluasi rutin.",
    view: "true",
  });

  // Open direct high-res PDF preview in new tab (100% immune to local blob download naming issues)
  const pdfUrl = `/api/export-pdf?${params.toString()}`;
  window.open(pdfUrl, "_blank");
}
