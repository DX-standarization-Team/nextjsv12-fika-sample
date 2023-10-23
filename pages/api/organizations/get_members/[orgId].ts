import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { orgId } = req.query
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN ? process.env.NEXT_PUBLIC_AUTH0_DOMAIN : ''
    const client_id = process.env.ADMIN_M2M_CLIENT_ID ? process.env.ADMIN_M2M_CLIENT_ID : ''
    const client_secret = process.env.ADMIN_M2M_CLIENT_SECRET
      ? process.env.ADMIN_M2M_CLIENT_SECRET
      : ''
    if (domain == '' || client_id == '' || client_secret == '') {
      throw new Error('environment variable is not set')
    }
    const { authorization } = req.headers
    if (authorization == '') {
      throw new Error('Authorization is not set')
    }

    console.log({
      orgId: orgId,
      domain: domain,
      client_id: client_id,
      client_secret: client_secret,
      authorization: authorization,
    })

    // 企業メンバ一覧取得
    const response = await fetch(`https://${domain}/api/v2/organizations/${orgId}/members`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
    })
    const memberData = await response.json()
    console.log({ memberData: memberData })
    res.status(200).json(memberData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
