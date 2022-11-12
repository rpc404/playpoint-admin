import React from 'react'
import './styles/style.css'

export default function Topbar() {
  return (
    <div className='topbar__container'>
      <div>Copyright &copy; to Playpoint 2022. All Rights Reserved</div>
      <div>Privacy Policy | Terms & Conditions</div>
      <div>Made with ❤️ by <a href="http://theboringschool.org" target="_blank" rel="noopener noreferrer">The Boring School</a>.</div>
    </div>
  )
}
