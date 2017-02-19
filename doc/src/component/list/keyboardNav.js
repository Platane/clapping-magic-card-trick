import React        from 'react'


const keyDownHandler = function( e ){

    const { versions, selectedVersionId, selectVersion } = this.props

    switch( e.which ){
        case 38:
        case 39:
            const next = versions[ versions.findIndex( ({id}) => selectedVersionId == id ) + 1 ]
            next && selectVersion && selectVersion( next.id )
            break

        case 40:
        case 37:
            const previous = versions[ versions.findIndex( ({id}) => selectedVersionId == id ) - 1 ]
            previous && selectVersion && selectVersion( previous.id )
            break
    }
}

export class KeyBoardNav extends React.Component {

    componentDidMount() {
        window.addEventListener('keydown',keyDownHandler.bind(this))
    }

    render(){
        return null
    }
}
