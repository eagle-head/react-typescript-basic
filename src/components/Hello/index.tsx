import React, { Fragment, FunctionComponent } from "react";

import classes from "./styles.scss";
import { RebelBrands } from "../../assets/svg";

export const Hello: FunctionComponent = () => (
  <Fragment>
    <h1 className={classes.title}>Hello from Primary Heading</h1>
    <h3 className={classes.title__tertiary}>Hello from Tertiary Heading</h3>
    <RebelBrands width="200px" height="200px" />
  </Fragment>
);
