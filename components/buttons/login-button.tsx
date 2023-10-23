import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <a className="button__login" onClick={() => loginWithRedirect()}>
      Log In
    </a>
  )
}
