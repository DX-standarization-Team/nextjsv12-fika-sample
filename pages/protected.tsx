import { NextPage } from "next";
import React from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Protected: NextPage = () => {
  const {user, getAccessTokenSilently} = useAuth0();
  console.log("user####")
  console.log(user)
  const accessT = getAccessTokenSilently();
  console.log("accessT####")
  console.log(accessT)

  const message = "This is a protected message."

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong>.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Protected Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuthenticationRequired(Protected);
