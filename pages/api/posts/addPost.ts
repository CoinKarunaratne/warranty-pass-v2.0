import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type FormValues = {
  product: string;
  store: string;
  period: string;
  date: Date;
  type: string;
  expiryDate: Date;
  picture: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Please sign in to make a post" });
    const post: FormValues = req.body.values;
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    try {
      const result = await prisma.post.create({
        data: {
          product: post.product,
          store: post.store,
          period: post.period,
          date: post.date,
          type: post.type,
          expiryDate: post.expiryDate,
          userId: prismaUser?.id,
          picture: post.picture,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(403).json({ error: { err } });
    }
  }
};

export default handler;
