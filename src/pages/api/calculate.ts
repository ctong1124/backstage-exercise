import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  datetime: string;
  number: number;
};

const db:string[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { number } = JSON.parse(req.body);
  const now = new Date();
  db.push(`${now}, ${number}`);
  console.log('db', db);
  res.status(200).json({ datetime: String(now), number });
}
