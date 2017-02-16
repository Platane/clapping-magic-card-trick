import React    from 'react'

import style    from './style.css'


const load = url =>
    fetch( url )
        .then( res => res.text() )
        .then( apply )

const apply = script => {

    const globalPropsBefore = []
    for ( let i in window )
        globalPropsBefore.push( i )

    eval( script )

    const globalPropsAfter = []
    for ( let i in window )
        globalPropsAfter.push( i )

    const leaks = globalPropsAfter.filter( x => !globalPropsBefore.includes( x ) )
}


export class Embed extends React.Component {


    shouldComponentUpdate() {
        return false
    }

    componentDidUpdate() {
        window.a = this.ref.canvas
        window.d = document
        window.c = this.ref.canvas.getContext('2d')
        window.b = this.ref.container

        if ( this.props.url_indexJs )
            load( this.props.url_indexJs )
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.url_indexJs )
            load( nextProps.url_indexJs )
    }

    render(){

        const zoom = this.props.zoom || 1

        return (
            <div className={style.containerWrapper} >
                <div className={style.container} ref="container">
                    <canvas className={style.canvas} ref="canvas" />
                </div>
            </div>
        )
    }
}