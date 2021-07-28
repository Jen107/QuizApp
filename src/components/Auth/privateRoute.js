import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthenticator } from "./AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuthenticator()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}