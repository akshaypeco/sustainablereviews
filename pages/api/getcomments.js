import { getComments } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const q = req.query.q;
    const comments = await getComments(q);
    res.status(200).json({ comments });
  } catch (e) {
    res.status(400).end();
  }
}
