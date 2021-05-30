import React, { FunctionComponent, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Props } from "./interface";
import Logo from "../assets/images/react.png";
import { ErrorBoundary } from "../pages/ErrorBoundary";
import { LoginForm } from "../components/LoginForm";
import { Hello } from "../components/Hello";
import "./styles.scss";

const Home = lazy(() =>
  import("../pages/Home").then(({ Home }) => ({
    default: Home,
  }))
);

const Users = lazy(() =>
  import("../pages/Users").then(({ Users }) => ({
    default: Users,
  }))
);

function noop(): void {
  return;
}

export const App: FunctionComponent<Props> = ({ name }: Props) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<h1>Loading ...</h1>}>
        <h1 className="bg-title">Hello, {name} ☀️</h1>
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

        <Router>
          <div>
            <Link to="/">Home Page</Link>
          </div>
          <div>
            <Link to="/users">Users Page</Link>
          </div>

          <Route path="/" exact component={Home} />
          <Route path="/users" component={Users} />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};
