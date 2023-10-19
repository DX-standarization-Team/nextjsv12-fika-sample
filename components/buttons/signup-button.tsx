import { useAuth0 } from '@auth0/auth0-react';

export const SignupButton = () => {
  const {
    loginWithRedirect,
  } = useAuth0();
  
  return (
    // <a className="button__sign-up" href="/api/auth/signup">
    <a 
      className="button__sign-up"
      onClick={() => loginWithRedirect({ 
        authorizationParams: { screen_hint: 'signup' }
      })}
    >
      Sign Up
    </a>
  );
};
