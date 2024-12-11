import { useState, Dispatch, SetStateAction } from 'react';
import type { Response } from '@/types/types';

type InputFormProps = {
  logs: Response[];
  setLogs: Dispatch<SetStateAction<Response[]>>;
};

export const InputForm = ({ logs, setLogs }: InputFormProps) => {
  const [n, setN] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // regex for numbers between 1 and 100: https://regex101.com/r/rvui1P/1
    const regex = new RegExp('^[1-9][0-9]?$|^100$');

    // test if input is valid
    if (regex.test(n)) {
      setInputError(false);
      const postData = async () => {
        const data = {
          number: Number(n),
        };

        const response = await fetch('/api/calculate', {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return response.json();
      };

      postData().then((data) => {
        setLogs([data, ...logs]);
      });
    }
    // invalid input, show error to user
    else {
      setInputError(true);
    }
  };

  return (
    <div className="bg-slate-50 rounded-lg p-8">
      <h2 className="text-xl font-bold mb-2">Form</h2>
      <p>
        Enter a number to calculate the (square of the sums of first n nums) - (the sum of
        the squares of first n nums)
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="Number">Number: </label>
          <input
            id="number"
            type="text"
            value={n}
            onChange={(e) => setN(e.target.value)}
            className={`border rounded-md p-2 ${inputError ? 'border-rose-600 border-2' : 'border-slate-300'}`}
          />
          {inputError && (
            <span className="pl-2 text-rose-600">
              Invalid input, please enter number between 1 and 100
            </span>
          )}
        </div>

        <button type="submit" className="px-8 py-2 mt-6 bg-sky-300 rounded-md font-bold">
          Submit
        </button>
      </form>
    </div>
  );
};
