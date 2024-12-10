
## Getting Started

Using Node v20.9.0
Using Yarn 1.22.22

To get started:
```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



# Requirements

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

Assumptions (after thinking through):
- server log only since application start


Initial thoughts:
- Overall application architecture options:
  - Real calculations on server with NextJS API routes (pages router)
    - Pros
      - Can actually do calculations on server
      - Actually an API request
      - Good paradigm for calling API route on form submission
    - Cons: 
      - could be overkill
  - Real calculations on server with NextJS server actions (apps router)
    - Pros
      - Can actually do calculations on server
    - Cons: 
      - could be overkill
      - personally not as familiar with app router and server actions at the moment
  - fake server calls using regular React returning Promise to simulate an async request
    - Pros
      - probably most simple
      - don't actually have to deal with a server
    - Cons: 
      - faking a lot, including server call and api response
- Data storage: part of requirements include API call return info includes # of times input has been requested and date/time of last request for this input. This needs to be stored somewhere on "server". Options:
  - Fake storage in scope of "server"
    - Pros: 
      - simple
    - Cons:
      - memory is temporary and destroyed on "server" restart
  - DB
    - Pros:
      - non-temporary memory
    - Cons: 
      - more difficult
      - overkill


Main parts: 
- application architecture
- UI
- calculation


Tasks:
- Form to submit
- POST route (no calc)
- stores data? 
- calculation
- listing table 
- error handling

