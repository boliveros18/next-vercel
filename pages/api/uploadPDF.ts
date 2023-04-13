import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import { dbMedics } from "../../database";
cloudinary.config(process.env.CLOUDINARY_URL || "");

type Data = {
  message: string;
};

let id: string | string[] = "";
let type: string | string[] = "";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return upload(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const saveFile = async (file: formidable.File): Promise<string> => {
  const { secure_url } = await cloudinary.uploader.upload(file.filepath);
  return secure_url;
};

const parseFiles = async (req: NextApiRequest): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      id = fields.id;
      type = fields.type;
      const filePath = await saveFile(files.pdf as formidable.File);
      resolve(filePath);
    });
  });
};

const upload = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const fileURL = await parseFiles(req);
  const medic = await dbMedics.getMedicById(id);
  if (medic) {
    switch (type) {
      case "card_id":
        const [card_id] = medic?.card_id
          .substring(medic?.card_id.lastIndexOf("/") + 1)
          .split(".");
        card_id.length > 0 ? await cloudinary.uploader.destroy(card_id) : null;
        break;
      case "curriculum":
        let [curriculum] = medic?.curriculum
          .substring(medic?.curriculum.lastIndexOf("/") + 1)
          .split(".");
        curriculum.length > 0
          ? await cloudinary.uploader.destroy(curriculum)
          : null;
        break;
    }
  }
  return res.status(200).json({ message: fileURL });
};
