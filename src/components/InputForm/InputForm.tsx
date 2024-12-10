import { useState, Dispatch, SetStateAction } from 'react';
import type { Log } from '@/types/types';

type InputFormProps = {
  logs: Log[];
  setLogs: Dispatch<SetStateAction<Log[]>>;
}

export const InputForm = ({ logs, setLogs }: InputFormProps) => {
  const [n, setN] = useState(1);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const postData = async () => {
      const data = {
        number: n,
      };

      const response = await fetch('/api/calculate', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.json();
    };

    postData().then((data) => {
      console.log('post', typeof data.datetime)
      setLogs([data, ...logs]);
    });
  }

  return (
    <div className="bg-slate-50 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-2">Form</h2>
      <p>Enter a number to calculate the (square of the sums of first n nums) - (the sum of the squares of first n nums)</p>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="Number">Number: </label>
          <input
            id="number"
            type="number"
            min='1'
            max='100'
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="border border-slate-300 rounded-md p-2"
          />
        </div>
        <button type="submit" className="px-8 py-2 mt-6 bg-sky-300 rounded-md font-bold">Submit</button>
      </form>
    </div>
  );

};