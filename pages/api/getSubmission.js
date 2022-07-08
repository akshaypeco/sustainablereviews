import { getSubmission } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const q = req.query.q;
    const submission = await getSubmission(q);
    res.status(200).json({ submission });
  } catch (e) {
    res.status(400).end();
  }
}
