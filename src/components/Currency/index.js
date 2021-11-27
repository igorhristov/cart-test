import React, { PureComponent } from "react";

import * as styles from "./currencies.module.css";

class Currencies extends PureComponent {
  render() {
    return <span className={styles.currencies}>$ 150</span>;
  }
}

export default Currencies;
