import * as React from 'react'
import ReactOnRails from 'react-on-rails'
import { BrowserRouter } from 'react-router-dom'
import Routes, { RailsAppProps } from './routes'

const App = (props: RailsAppProps) => (
  <BrowserRouter basename="/v2">
    <Routes {...props} />
  </BrowserRouter>
)

ReactOnRails.register({ App });
