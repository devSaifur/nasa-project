import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link className="flex items-center gap-4" to="/launch">
        <img src="/favicon.png" alt="Logo" />
        <h1 className="text-3xl font-bold">NASA Mission Control</h1>
      </Link>
    </div>
  )
}

export default Logo
