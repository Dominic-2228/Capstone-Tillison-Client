import Layout from '../components/layout.js'
import Navbar from '../components/navbar.jsx'

export default function Index() {
  return (
    <Reviews />
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}