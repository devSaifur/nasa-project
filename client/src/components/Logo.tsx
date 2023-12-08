import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <Link to="/launch">
        <img src="/favicon.png" alt="Logo" />
      </Link>
      <h1 className="text-2xl font-extrabold">NASA Mission Control</h1>
    </div>
  )
}

export default Logo
