
# Getting Started

Used Node v20.9.0
Used Yarn 1.22.22

To get started:
```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# TL;DR
Here are the main files to see the bulk of my work!
- `src/pages/api/calculate.ts`: all work done on the server including calculating the value requested, API call logic, storing information on past calls
- `src/pages/index.tsx`: main entry page for application
- `src/components/InputForm/InputForm.tsx`: Frontend component for the form
- `src/components/LogTable/LogTable.tsx`: Frontend component for the logs



# Extended view into my thought process/working process

## Requirements

- Design a web application that allows the user to query the following:
  - (square of the sum of the first n natural numbers) - (the sum of the squares of the first n natural numbers)
  - where n is an integer greater than 0 and less than or equal to 100
- Users should be able to input a valid number in a form somewhere in your application and have it sent to a server to calculate the result
- Invalid inputs should show an error to the user
- Should display a list of all of the API responses from the server (like a log), with the most recent at the top. You can format the list of results anyway you choose. For example, showing the data in table format or a list of the JSON responses.
- For this project, you do not need to implement an actual server. You can fake the server with a function that acts as the server, performing the calculation and returning a Promise to simulate an asynchronous request.
- Your fake API call should return a Promise of a JSON object with the following structure:
`
{
  datetime //current date/time of this request,
  value // solution,
  number // input number
  occurrences // the number of times input has been requested
  last_datetime // last date/time of request for this input
}
`

## Scope/Architecture:
- Overall application architecture options:
  - Option 1: Real calculations on server with NextJS API routes (pages router)
    - Pros:
      - can actually do calculations on server
      - actually an API request
      - existing paradigm for calling API route on form submission
    - Cons: 
      - could be overkill
  - Option 2: Real calculations on server with NextJS server actions (apps router)
    - Pros:
      - can actually do calculations on server
    - Cons: 
      - could be overkill
      - personally not as familiar with app router and server actions at the moment
  - Option 3: Fake server calls using regular React returning Promise to simulate an async request
    - Pros:
      - probably most simple
      - don't actually have to deal with a server
    - Cons: 
      - faking a lot, including server call and api response
  - Conclusion: decided to go with option 1. I liked that I could spend time writing real code on the server instead of deciding on a pattern to fake the server call. 
- Data storage: part of requirements include API call return info includes # of times input has been requested and date/time of last request for this input. This needs to be stored somewhere on "server". Options:
  - Option 1: Fake storage in scope of server
    - Pros: 
      - simple
    - Cons:
      - memory is temporary and destroyed on server restart
  - Option 2: Implement a real DB
    - Pros:
      - non-temporary memory
    - Cons: 
      - more difficult
      - overkill
  - Conclusion: went with Option 1, setting up a DB would definitely bloat scope of this project.



## Task breakdown
Quick to test chosen app architecture: 
- Basic to submit
- POST route (no calc)
- basic data storage

After it looked okay: 
- nicer data types
- calculation code
- listing table 
- cleanup
- make it look nice
- validation/error handling


# Manual Testing

## Calculation testing
Input 1 => 0
Input 2 => 4
Input 3 => 22
Input 4 => 70
Input 5 => 170
Input 10 => 2640

## UI testing
Happy path, first time query which does calculation

Happy path, repeat query which pulls from DB

Sad path, Input 0 => Validation error

Sad path, Input 'a' => Validation error


# TODO/Improvements for future 
- Could be nice to implement an actual db so we can store values across server restarts
- Could turn the entire `Manual testing` section (above^^) into actual tests
- Could optimize squareOfSums calculation more
  - could implement another layer of storing for already calculated sums and utilize that for future sums
- When you refresh the page, it will refresh the server log table even if the server is still storing the previous calls. To fix this, could create a new GET call that grabs all logs from server storage on component mount. 
- Right now, you only see the answer to the equation in the logging area under value. Could be nice to write out the equation and answer in the Form area so the functionality/answer is clearer to end user. 