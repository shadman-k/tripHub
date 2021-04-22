import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Card, Button } from '@material-ui/core'

export default function LoginContainer() {
  
  return (
    <div className='login-container'>
      <Button href='http://localhost:8080/google'>Log In With Google</Button>
    </div>
  )
}
