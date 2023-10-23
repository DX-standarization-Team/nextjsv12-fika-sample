import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN ? process.env.NEXT_PUBLIC_AUTH0_DOMAIN : ''
    const client_id = process.env.ADMIN_M2M_CLIENT_ID ? process.env.ADMIN_M2M_CLIENT_ID : ''
    const client_secret = process.env.ADMIN_M2M_CLIENT_SECRET
      ? process.env.ADMIN_M2M_CLIENT_SECRET
      : ''
    if (domain == '' || client_id == '' || client_secret == '') {
      throw new Error('environment variable is not set')
    }
    console.log({
      domain: domain,
      client_id: client_id,
      client_secret: client_secret,
    })

    // アクセストークンを取得
    const response = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      // headers: { 'content-type': 'application/json' },
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: client_id,
        client_secret: client_secret,
        audience: `https://${domain}/api/v2/`,
      }),
    })
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
