import { useState } from 'react';
import localFont from "next/font/local";
import { InputForm } from '@/components/InputForm/InputForm';
import { Logs } from '@/components/Logs/Logs';

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
  const [logs, setLogs] = useState([]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-8 pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="font-bold text-2xl mb-6">Backstage Technical Exercise</h1>
      <InputForm />
      <Logs />
    </div>
  );
}
