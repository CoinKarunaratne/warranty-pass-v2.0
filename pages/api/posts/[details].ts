import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const details = Array.isArray(req.query.details)
      ? req.query.details.join()
      : req.query.details;
    try {
      const data = await prisma.post.findUnique({
        where: {
          id: details,
        },
        include: {
          user: true,
        },
      });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
