require('file-loader?name=index.html!./index.html')

import { createStore, applyMiddleware, compose } from 'redux'
import RefineryCreate           from 'refinery-js'
import ReactDOM                 from 'react-dom'
import {Provider}               from 'react-redux'
import React                    from 'react'
import * as reducerTree         from './reducer'
import * as action              from './action'
import {App}                    from './component/app'





let store
{
    const crashReporter = store => next => action => {
        try {
            return next(action)
        } catch (err) {
            console.error('Caught an exception!', err)
            throw err
        }
    }

    const { reduce, initState }   = RefineryCreate( reducerTree )

    // create redux store
    const middlewares = [
        crashReporter,
    ]
    const enhancers = [
        ...(
            'undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? [ window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 50, latency: 500 }) ]
            : []
        ),
        applyMiddleware( ...middlewares ),
    ]
    store = createStore( reduce, initState, compose( ...enhancers ) )
}

{
    ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('app') )
}


// const SOURCE_URL = 'http://localhost:8083'
const SOURCE_URL = process.env.SOURCE_URL == '/' ? '' : process.env.SOURCE_URL || 'https://platane.github.io/clapping-magic-card-trick'

fetch(SOURCE_URL+'/index')
    .then( res => res.text() )
    .then( res =>
        res
        .split('\n')
        .filter( Boolean )
        .map( x => {
            const [ commit, date, size, ...message ] = x.split(' ')
            return {
                id                  :commit,
                commit,
                date                : 1000*(+date),
                size                : +size,
                message             : message.join(' '),
                url                 : SOURCE_URL+'/'+commit+'/index.html',
                url_indexJs         : SOURCE_URL+'/'+commit+'/index.js',
                url_indexJs_commit  : 'https://github.com/Platane/clapping-magic-card-trick/blob/'+commit+'/src/index.js',
            }
        })
        .sort( (a,b) => a.date > b.date ? 1 : -1 )
    )
    .then( history => store.dispatch( action.initHistory( history ) ) )
