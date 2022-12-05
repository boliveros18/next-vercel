// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { Clinic } from '../../models'
import { seedData } from '../../database';

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if( process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'You do not have access to this service'})
    }
    await db.connect()
    await Clinic.deleteMany()
    await Clinic.insertMany( seedData.entries)

    await db.disconnect()

  res.status(200).json({ message: 'Process done correctly' })
}
