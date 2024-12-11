import type { NextApiRequest, NextApiResponse } from 'next';
import type { Response, Db, Logs } from '@/types/types';

/*
 * Calculates square of the sums of first n nums
 */
const squareOfSums = (n: number) => {
  // create an array of numbers from 0 to the number provided, e.g. [0, 1, 2, ..., n]
  const arrayOfNums = [...Array(n + 1).keys()];

  // sum of numbers in array
  const sumOfNums = arrayOfNums.reduce((acc, i) => acc + i, 0);

  // squares sum
  return sumOfNums ** 2;
};

/*
 * Calculates the sum of the squares of first n nums
 */
const sumOfSquares = (n: number) => {
  // there is a handy mathematical formula for sum of squares: https://www.cuemath.com/algebra/sum-of-squares/
  return (n * (n + 1) * (2 * n + 1)) / 6;
};

/*
 * Calculates (square of the sums of first n nums) - (the sum of the squares of first n nums)
 */
const calculate = (n: number) => squareOfSums(n) - sumOfSquares(n);

/*
 * Code for API reponse and storing data
 */

// This models a db on the server. Since it is not a real db, this will be reset everytime the server is restarted.
const db: Db = {};
const logs: Logs = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  // Receive input from api call
  const { number } = JSON.parse(req.body);

  // Calculate current time
  const now = new Date();

  // Calculate the value or pull the number from memory
  if (db[number]) {
    // Number is stored in db, so we've calculated this before
    console.log('Retrieving value from db...');

    // Update logs and db based on old logs and new log
    const logIdentifier = `${number}-${String(now)}`;
    logs[logIdentifier] = now;

    const { value, logsForN: logsForNPrev } = db[number];

    db[number] = {
      value,
      logsForN: [logIdentifier, ...logsForNPrev],
    };

    // Send response
    res.status(200).json({
      datetime: now,
      value,
      number,
      occurrences: db[number].logsForN.length,
      last_datetime: logs[logsForNPrev[0]],
    });
  } else {
    // Number is not stored in db, we need to calculate
    console.log('Calculating...');

    // Do calculation
    const value = calculate(number);

    // Create a log with unique identifier and store log time
    const logIdentifier = `${number}-${String(now)}`;
    logs[logIdentifier] = now;

    // Update the db
    db[number] = {
      value,
      logsForN: [logIdentifier],
    };

    // Send the response
    res.status(200).json({
      datetime: now,
      value,
      number,
      occurrences: 1,
      last_datetime: new Date(0),
    });
  }
}
