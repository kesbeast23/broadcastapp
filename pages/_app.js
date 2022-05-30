import "tailwindcss/tailwind.css";
import { AuthProvider } from "../Auth";
import "../styles.css";

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider> )
}

export default MyApp;
