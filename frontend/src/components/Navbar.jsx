import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar border-b bg-gray-200 border-gray-300 shadow-none px-0 ">
    <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex="0" role="button" className="btn btn-ghost btn-circle bg-transparent text-gray-800 hover:text-black border-none shadow-none text-lg font-normal">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="0"
        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 bg-black/80 hover:text-black border-none shadow-none text-xl font-normal">
        <li><Link to='/' className='text-lg text-gray-300 hover:text-white font-medium'>Home</Link></li>
        <li><Link to='/save' className='text-lg text-gray-300 hover:text-white font-medium'>Saved</Link></li>
      </ul>
      </div>
    </div>
    <div className="navbar-center hidden md:flex">
    <Link to='/' className="btn btn-ghost bg-transparent text-gray-900 hover:text-black border-none shadow-none text-lg font-normal">What's in my fridge? - <span className='text-orange-400 font-medium italic'>Recipe Finder</span></Link>
    </div>
    <div className="navbar-end hidden md:flex">
     <Link to='/save' className="btn btn-ghost bg-transparent text-gray-900 hover:text-black border-none shadow-none text-lg font-normal">Saved recipes</Link>
    </div>
    </div>
  )
}

export default Navbar