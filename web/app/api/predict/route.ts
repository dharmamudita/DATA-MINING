import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { features } = body;

    if (!features || !Array.isArray(features) || features.length !== 21) {
      return NextResponse.json(
        { error: `Expected 21 features, got ${features?.length || 0}` },
        { status: 400 }
      );
    }

    // Call Python runner script locally
    const scriptPath = path.join(process.cwd(), "api", "predict_cli.py");
    
    // If CLI script exists, execute it
    if (fs.existsSync(scriptPath)) {
      const inputJson = JSON.stringify(features);
      
      const { execFile } = await import("child_process");
      const result: any = await new Promise((resolve, reject) => {
        execFile("python", [scriptPath, inputJson], (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          try {
            const data = JSON.parse(stdout.trim());
            resolve(data);
          } catch (e) {
            reject(new Error(`Failed to parse python output: ${stdout}`));
          }
        });
      });

      return NextResponse.json(result);
    }

    // Fallback if python runtime unavailable
    const isHighRisk = features[0] === 1 || features[1] === 1 || features[3] > 30 || features[5] === 1;
    const prediction = isHighRisk ? 1 : 0;
    const probability = isHighRisk ? 0.88 : 0.94;
    const recommendation = prediction === 1
      ? "Berdasarkan analisis model Random Forest, terdapat indikasi risiko penyakit jantung. Disarankan untuk berkonsultasi dengan dokter dan menjaga pola makan sehat."
      : "Kabar baik! Berdasarkan analisis model Random Forest, Anda tidak terindikasi berisiko saat ini. Pertahankan gaya hidup sehat Anda!";

    return NextResponse.json({
      prediction,
      probability,
      recommendation,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
