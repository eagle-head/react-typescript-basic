import React, { Fragment, FunctionComponent } from "react";

import "./styles.scss";
import { RebelBrands } from "../../assets/svg";

export const Hello: FunctionComponent = () => (
  <Fragment>
    <h1 className="title">Hello from Primary Heading</h1>
    <h3 className="title__tertiary">Hello from Tertiary Heading</h3>
    <RebelBrands width="200px" height="200px" />
  </Fragment>
);
