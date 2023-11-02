import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AppLayout = () => {
  return (
    <div className="bg-primary h-screen px-40 py-8 text-white">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout
