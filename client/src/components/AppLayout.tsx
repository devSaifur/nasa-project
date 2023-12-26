import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className="relative flex h-screen flex-col overflow-y-auto px-40 pt-8 text-primary">
      <img
        src="/img/background-large.jpg"
        className="fixed inset-0 -z-10 h-screen xl:h-auto"
        alt="background image"
      />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
