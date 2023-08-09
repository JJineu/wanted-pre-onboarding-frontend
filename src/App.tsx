import Router from "./components/Router";
import { css } from "@emotion/css";

export default function App() {
  return (
    <div className={css({ display: "flex" })}>
      <Router />
    </div>
  );
}
