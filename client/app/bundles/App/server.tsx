import {renderToString} from 'react-dom/server'
import * as React from 'react'
import {renderStylesToString} from 'emotion-server'
import ReactOnRails from 'react-on-rails'
import { StaticRouter } from 'react-router-dom'
import Routes, { RailsAppProps } from './routes'

const renderRouter = (props: RailsAppProps, location: string) => (
    <StaticRouter location={location} context={{}} basename="/v2">
        <Routes {...props} />
    </StaticRouter>
)

const App = (props: RailsAppProps, context: { location: string, serverSide: boolean }) => {
    const html = renderStylesToString(renderToString(renderRouter(props, context.location)))
    const renderedHtml = {
        componentHtml: html,
        // TODO: add react-helmet
        // title: helmet.title.toString(),
        // meta_tags: helmet.meta.toString(),
    }
    return {renderedHtml}
}

ReactOnRails.register({ App });
