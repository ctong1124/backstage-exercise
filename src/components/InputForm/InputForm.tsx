import { useState } from 'react';


export const InputForm = () => {
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
    <>
      <h2 className="text-lg font-medium mb-2">Form</h2>
      <p>Enter a number to calculate the (square of the sums of first n nums) - (the sum of the squares of first n nums)</p>
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
        <button type="submit" className="px-8 py-2 my-6 bg-sky-300 rounded-md">Submit</button>
      </form>
    </>
  );

};