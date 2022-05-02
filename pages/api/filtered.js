import { filterSubmissions } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const q = req.query.q;
    const shops = await filterSubmissions(q);
    res.status(200).json({ submissions });
  } catch (e) {
    res.status(400).end();
  }
}
