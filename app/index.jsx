import { Reviews } from '@/components/reviews.jsx'
import Navbar from '../src/components/navbar/navbar.jsx'
import RootLayout from './layout.js'

export default function Index() {
  return (
    <Reviews />
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <Navbar />
      {page}
    </RootLayout>
  )
}