import { addItem } from "../../lib/firestore";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).end();
      }
      const id = await addItem(fields);
      res.status(200).json({ id });
      res.status(200).end();
    });
  } catch (e) {
    res.status(400).end();
  }
}
