import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
  const {
    logout,
  } = useAuth0();
  return (
    // <a className="button__logout" href="/api/auth/logout">
    <a className="button__logout"
    onClick={() => logout({
      logoutParams: {returnTo: window.location.origin}
    })}>
      Log Out
    </a>
  );
};
