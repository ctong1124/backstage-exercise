import { useState } from 'react';
import localFont from "next/font/local";
import { InputForm } from '@/components/InputForm/InputForm';
import { LogTable } from '@/components/LogTable/LogTable';
import type { Log } from '@/types/types';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="font-bold text-2xl mb-6">Backstage Technical Exercise</h1>
      <InputForm logs={logs} setLogs={setLogs}/>
      <LogTable logs={logs}/>
    </div>
  );
}
