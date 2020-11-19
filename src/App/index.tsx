import React, { FunctionComponent } from "react";

import classes from "./styles.scss";
import Logo from "../assets/images/react.png";
import { Props } from "./interface";
import { ErrorBoundary } from "../pages/Error/ErrorBoundary";

import { LoginForm } from "../components/LoginForm";
import { Hello } from "../components/Hello";

function noop(): void {
  return;
}

export const App: FunctionComponent<Props> = ({ name }: Props) => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};
