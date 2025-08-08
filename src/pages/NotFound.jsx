import React from 'react'
import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12 bg-white">
      {/* Logo Row */}
      <div className="flex items-center space-x-2 mb-6">
        <BsYoutube color="#FF0000" size="2.5rem" />
        <span className="text-2xl sm:text-3xl font-semibold text-gray-900">YouTube</span>
      </div>

      {/* 404 Message */}
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6">
        This page isn't available. Sorry about that.
      </p>

      {/* Home Link */}
      <Link
        to="/"
        className="px-5 py-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition text-sm sm:text-base font-medium"
      >
        Go to YouTube Home
      </Link>
    </div>
  )
}

export default NotFound;
