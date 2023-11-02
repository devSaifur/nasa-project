import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className="flex items-center gap-12">
      <Link to="/">
        <img src="/favicon.png" alt="Logo" />
      </Link>
      <h1 className="text-2xl font-extrabold text-blue-500">
        NASA Mission Control
      </h1>
    </div>
  )
}

export default Logo
