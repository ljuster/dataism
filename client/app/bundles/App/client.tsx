import * as React from 'react'
import ReactOnRails from 'react-on-rails'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureClientStore } from './store/configureStore'
import Routes, { RailsAppProps } from './routes'

const App = (props: RailsAppProps) => {
    const store = configureClientStore({images: {}, checkout: {}});

    return (
      <Provider store={store}>
        <BrowserRouter basename="/v2">
        <Routes {...props} />
        </BrowserRouter>
      </Provider>)
}

ReactOnRails.register({ App });
