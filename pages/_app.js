import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { StateProvider } from "../stateProvider";
import reducer, { initialState } from "./../reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Binding events.
Router.events.on("routeChangeStart", () =>
  NProgress.start()
);
Router.events.on("routeChangeComplete", () =>
  NProgress.done()
);
Router.events.on("routeChangeError", () =>
  NProgress.done()
);

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider
      initialState={initialState}
      reducer={reducer}>
      <Component {...pageProps} />
      <ToastContainer />
    </StateProvider>
  );
}

export default MyApp;
