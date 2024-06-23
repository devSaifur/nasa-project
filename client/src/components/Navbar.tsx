import Logo from './Logo'
import Nav from './Nav'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between text-primary">
      <Logo />
      <Nav />
    </nav>
  )
}

export default Navbar
