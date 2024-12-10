import type { NextApiRequest, NextApiResponse } from "next";

/*
 * Calculates square of the sums of first n nums
 */

const squareOfSums = (n: number) => {
  // create an array of numbers from 0 to the number provided, e.g. [0, 1, 2, ..., n]
  const arrayOfNums = [...Array(n + 1).keys()];
  const sumOfNums = arrayOfNums.reduce((acc, i) => (
    acc + i
  ), 0);
  return sumOfNums **2;
}

/*
 * Calculates the sum of the squares of first n nums
 */

const sumOfSquares = (n: number) => {
  // there is a handy mathematical formula for sum of squares: https://www.cuemath.com/algebra/sum-of-squares/
  return (n * (n + 1) * (2 * n + 1)) / 6;
}


/*
 * Calculates (square of the sums of first n nums) - (the sum of the squares of first n nums)
 */

const calculate = (n: number) => {
  console.log('squareOfSums', squareOfSums(n), 'sumOfSquares', sumOfSquares(n))
  return squareOfSums(n) - sumOfSquares(n);
}

/*
 * Code for API reponse and storing data
 */
type Response = {
  datetime: Date;
  value: number;
  number: number;
  occurrences: number;
  last_datetime: Date | 'N/A';
}

type DbValue = {
  value: number;
  occurrences: number;
  last_datetime: Date | 'N/A';
}

type Db = {
  [key: number]: DbValue;
}

// This models a db on the server. Since it is not a real db, this will be reset everytime the server is restarted
const db: Db = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  // Receive input from api call
  const { number } = JSON.parse(req.body);

  // Calculate current time
  const now = new Date();


  // Calculate the value or pull the number from memory

  // Number is stored in db, so we've calculated this before
  if(db[number]) {
    console.log('Retrieving value from db...')
    // Update the db based on previous values
    const {
      value,
      occurrences: prevOccurences,
      last_datetime: prevLastDateTime,
    } = db[number];

    db[number] = {
      value,
      occurrences: prevOccurences + 1,
      last_datetime: now, // this occurrence will be the last time when this is called in the future
    }

    // Send response
    res.status(200).json({
      datetime: now, 
      value, 
      number,
      occurrences: prevOccurences + 1,
      last_datetime: prevLastDateTime, 
    });
  }

  // Number is not stored in db, we need to calculate
  else {
    console.log('Calculating...')
    // Do calculation
    const value = calculate(number);

    // Update the db
    db[number] = {
      value,
      occurrences: 1,
      last_datetime: now, // this occurrence will be the last time when this is called in the future
    };

    // Send the response
    res.status(200).json({
      datetime: now, 
      value, 
      number,
      occurrences: 1,
      last_datetime: 'N/A', 
    });
  }
  console.log('db', db);
}
