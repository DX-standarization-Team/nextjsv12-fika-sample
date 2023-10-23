import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { CodeSnippet } from '../components/code-snippet'
import { PageLayout } from '../components/page-layout'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

const Admin: NextPage = () => {
  const { getAccessTokenSilently } = useAuth0()
  const [data, setData] = useState('')

  useEffect(() => {
    const f = async () => {
      try {
        // アクセストークンを取得
        const tokenResponse = await fetch(`/api/getAdminAccessToken`)
        const tokenData = await tokenResponse.json()
        console.log(tokenData)
        // 企業メンバ一覧取得
        const orgId = 'org_jCMMHxNbM9CELjvp' // 実際はログインユーザ(管理者)の企業ID取得
        const response = await fetch(`/api/organizations/get_members/${orgId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        })
        const data = await response.json()
        setData(data)
      } catch (error: any) {
        setData(error)
      }
    }
    f()
  }, [getAccessTokenSilently])

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Admin Page
        </h1>
        <div className="content__body"></div>
        <div className="content__body">
          {/* <p id="page-description">
            <span>
              This page retrieves an <strong>admin message</strong>.
            </span>
            <span>
              <strong>
                Only authenticated users with the <code>read:admin-messages</code> permission should
                access this page.
              </strong>
            </span>
          </p> */}
          <CodeSnippet title="Admin Message" code={data ? JSON.stringify(data) : ''} />
        </div>
      </div>
    </PageLayout>
  )
}

export default withAuthenticationRequired(Admin)

// ボツ
// API GWに対するアクセストークンを取得
// const access_token = await getAccessTokenSilently({
//   authorizationParams: {
//     audience: 'https://fs-apigw-bff-nakagome-bi5axj14.uc.gateway.dev/', // Value in Identifier field for the API being called.
//     scope: 'openid profile email offline_access', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
//   },
// })
// const userDetailsByIdUrl = `https://dev-kjqwuq76z8suldgw.us.auth0.com/userinfo`
// const metadataResponse = await fetch(userDetailsByIdUrl, {
//   headers: {
//     Authorization: `Bearer ${access_token}`,
//   },
// })
// const data = await metadataResponse.json()
// console.log({ data: data })
// Management APIに対するアクセストークンを取得
// const access_token = await getAccessTokenSilently({
//   authorizationParams: {
//     audience: 'https://dev-kjqwuq76z8suldgw.us.auth0.com/api/v2/', // Value in Identifier field for the API being called.
//     scope: 'read:current_user', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
//   },
// })
// const sub = user ? user.sub : ''
// const userDetailsByIdUrl = `https://dev-kjqwuq76z8suldgw.us.auth0.com/api/v2/users/${sub}`

// const metadataResponse = await fetch(userDetailsByIdUrl, {
//   headers: {
//     Authorization: `Bearer ${access_token}`,
//   },
// })
// const data = await metadataResponse.json()
// // const { user_metadata } = await metadataResponse.json()
// console.log({ user_metadata: data })
// setAccessToken(access_token)
