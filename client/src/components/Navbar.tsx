import Logo from './Logo'
import Nav from './Nav'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <Nav />
    </nav>
  )
}

export default Navbar
