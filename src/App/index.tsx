import React, { FunctionComponent, Suspense, lazy } from "react";

import Logo from "../assets/images/react.png";
import classes from "./styles.scss";
import { Props } from "./interface";
import { ErrorBoundary } from "../pages/Error/ErrorBoundary";

const LoginForm = lazy(() =>
  import("../components/LoginForm").then(({ LoginForm }) => ({
    default: LoginForm,
  }))
);

const Hello = lazy(() =>
  import("../components/Hello").then(({ Hello }) => ({
    default: Hello,
  }))
);

function noop(): void {
  return;
}

export const App: FunctionComponent<Props> = ({ name }: Props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <h1 className={classes.title}>Hello, {name} ☀️</h1>
        <img src={Logo} />
        <Hello />
        <div>
          <LoginForm
            shouldRemember={true}
            onPasswordChange={noop}
            onRememberChange={noop}
            onSubmit={noop}
            onUsernameChange={noop}
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
