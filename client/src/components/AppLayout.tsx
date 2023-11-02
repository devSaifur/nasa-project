import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AppLayout = () => {
  return (
    <div className="bg-primary text-primary h-screen px-40 py-8">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default AppLayout
