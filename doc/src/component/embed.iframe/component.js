import React    from 'react'

import style    from './style.css'


const load = ( iframe, url ) =>
    iframe && iframe.setAttribute('src', url)

const resize = ( iframe, width, height ) => {
    iframe && iframe.setAttribute('width', width)
    iframe && iframe.setAttribute('height', height)
}

const debounce = ( delay, fn ) => {
    let timeout
    return () => {
        clearTimeout( timeout )
        timeout = setTimeout( fn, delay )
    }
}

export class Embed extends React.Component {

    shouldComponentUpdate() {
        return false
    }

    componentDidMount() {
        if ( this.props.url )
            load( this.refs.iframe, this.props.url )

        const { width, height } = this.refs.container.getBoundingClientRect()
        resize( this.refs.iframe, width, height )
    }

    componentWillMount() {
        this.resize = debounce( 20, () => {
            const { width, height } = this.refs.container.getBoundingClientRect()
            resize( this.refs.iframe, width, height )
        })
        window && window.addEventListener('resize', this.resize)
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.url )
            load( this.refs.iframe, nextProps.url )
    }

    render(){
        return (
            <div className={style.container} ref="container" >
                <iframe
                    scrolling="no"
                    className={style.iframe}
                    ref="iframe"
                    />
            </div>
        )
    }
}