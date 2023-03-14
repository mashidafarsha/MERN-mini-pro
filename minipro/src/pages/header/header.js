import React from 'react'
import "./header.css"
function header() {
  return (
    <div className="head">
    <div className="headings">
      <h1>ADMIN</h1>
      <button
        className="logout"
       
      >
        Logout
      </button>
    </div>
  </div>
  )
}

export default header