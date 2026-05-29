import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(req: NextRequest) {
  try {
    const { email, time, txid, crypto } = await req.json();

    if (!email || !time) {
      return NextResponse.json({ error: "Email and time are required" }, { status: 400 });
    }

    const logsDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const logFile = path.join(logsDir, "payments.json");
    const entry = { email, time, txid: txid || null, crypto: crypto || null, receivedAt: new Date().toISOString() };

    let payments: typeof entry[] = [];
    try {
      const existing = fs.readFileSync(logFile, "utf-8");
      payments = JSON.parse(existing);
    } catch {
      payments = [];
    }
    payments.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(payments, null, 2));

    return NextResponse.json({ success: true, message: "Payment confirmation received" });
  } catch (error) {
    console.error("Confirm payment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
