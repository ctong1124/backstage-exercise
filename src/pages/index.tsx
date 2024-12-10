import { useState } from 'react';
import localFont from "next/font/local";

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
  const [n, setN] = useState(1);
  console.log('n', n, typeof n)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const postData = async () => {
      const data = {
        number: n,
      };

      const response = await fetch("/api/calculate", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };

    postData().then((data) => {
      console.log('after post', data);
    });
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} p-8 pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1 className="text-lg mb-4">Enter a number to calculate the (square of the sums of first n nums) - (the sum of the squares of first n nums) </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Number">Number: </label>
          <input
            id="number"
            type="number"
            min='1'
            max='100'
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="border border-slate-300 rounded-sm"
          />
        </div>
        <button type="submit" className="px-8 py-2 my-8 bg-sky-300 rounded-md">Submit</button>
      </form>
    </div>
  );
}
