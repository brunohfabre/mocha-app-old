import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AuthContext } from '@contexts/AuthContext'

export function PrivateRoute() {
  const { isSigned, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="logo-loading-container">
        <svg
          width="96"
          viewBox="0 0 514 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 282.909H77.4545V115.273C77.4545 84.3636 97.0909 63.8182 122.909 63.8182C148.364 63.8182 165.455 81.2727 165.455 108.727V282.909H240.545V112.364C240.545 83.4545 257.091 63.8182 285.273 63.8182C310 63.8182 328.545 79.2727 328.545 110.364V282.909H405.818V95.0909C405.818 34.5455 369.818 0 317.818 0C276.909 0 245.091 20.9091 233.636 52.9091H230.727C221.818 20.5454 193.273 0 154.909 0C117.273 0 88.7273 20 77.0909 52.9091H73.8182V3.63635H0V282.909Z"
            fill="#121214"
          />
          <path
            d="M469.729 282.818C493.001 282.818 513.183 263.364 513.365 239.182C513.183 215.364 493.001 195.909 469.729 195.909C445.729 195.909 425.91 215.364 426.092 239.182C425.91 263.364 445.729 282.818 469.729 282.818Z"
            fill="#7B2FFC"
          />
        </svg>
      </div>
    )
  }

  if (isSigned) {
    return <Outlet />
  }

  return <Navigate to="/sign-in" />
}
