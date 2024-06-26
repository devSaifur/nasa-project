import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className="relative flex h-screen flex-col overflow-y-auto bg-primaryBG px-40 pt-8 text-primary">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
