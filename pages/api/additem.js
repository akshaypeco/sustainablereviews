import { addItem } from "../../lib/firestore";

export default async function handler(req, res) {
  try {
    const id = await addItem(req.body);
    res.status(200).json({ id });
  } catch (e) {
    res.status(400).end();
  }
}
