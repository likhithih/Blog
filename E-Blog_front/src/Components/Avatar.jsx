import React from 'react'

function Avatar() {
  return (
    <div>
        <div className="flex flex-wrap justify-center gap-12">
      <div className="relative">
        <img
          className="h-16 w-16 rounded-full"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="user avatar"
        />
       
      </div>
    </div>
    </div>
  )
}

export default Avatar;