import "../styles/globals.css"
import AppLayout from "../components/AppLayout/index"
export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
