import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <ul className="flex items-center gap-8 font-bold text-blue-500">
      <li className="space-x-1">
        <span>🛸</span>
        <Link to="/" className="underline-offset-4 hover:underline">
          Launch
        </Link>
      </li>
      <li className="space-x-1">
        <span>🕘</span>
        <Link to="/upcoming" className="underline-offset-4 hover:underline">
          Upcoming
        </Link>
      </li>
      <li className="space-x-1">
        <span>📆</span>
        <Link to="/history" className="underline-offset-4 hover:underline">
          History
        </Link>
      </li>
    </ul>
  )
}

export default Nav
