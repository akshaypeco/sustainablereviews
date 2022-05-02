import { getAll } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const submissions = await getAll();
    res.status(200).json({ submissions });
  } catch (e) {
    res.status(400).end();
  }
}
