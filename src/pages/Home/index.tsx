import React, { FunctionComponent } from "react";

import classes from "./styles.scss";

export const Home: FunctionComponent = () => {
  return <h1 className={classes["primary-heading"]}>Hello from Home Page</h1>;
};
