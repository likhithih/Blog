import React from 'react'
import Sidebar from '../Components/Sidebar'

function Admin() {
  return (
    <div className="ml-0 md:ml-64">
      <Sidebar />
      <div className="p-6">Admin Dashboard</div>
    </div>
  )
}

export default Admin