import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head'
import { AppWrapper } from '../context/state'

export default function Layout({ children }) {
  return (
    <AppWrapper>
      <>
        <Head>
          <title>Tillison Business</title>
        </Head>
        <main className="container">{children}</main>
      </>
    </AppWrapper>
  )
}
