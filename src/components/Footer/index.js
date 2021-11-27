import React, { PureComponent } from "react";

export default class Footer extends PureComponent {
  render() {
    return (
      <footer
        style={{
          marginTop: "2rem",
          textAlign: "center",
          padding: "2rem 0",
          background: "#222",
          color: "#eaeaea",
        }}
      >
        Made by{" "}
        <a target="_blank" href="https://igorhristov.me/">
          Igor Hristov
        </a>{" "}
      </footer>
    );
  }
}
