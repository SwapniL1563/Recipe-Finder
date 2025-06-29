import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center  text-gray-500 border-t border-gray-300 p-6">
    <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Swapnil.</p>
    </aside>
    </footer>
  )
}

export default Footer