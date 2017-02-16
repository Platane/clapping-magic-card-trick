import * as ReacRedux     from 'react-redux'

export const connect = ( dependencies, mapper, mapDispatchToProps ) => {

    let mapStateToProps
    let areStatesEqual

    if ( dependencies ) {

        if ( mapper ) {

            mapStateToProps = state =>
                mapper( ...dependencies.map( name => state[name] ) )

        } else {

            const names = dependencies.map( name => name.split('.').slice(-1)[0] )

            mapStateToProps = state => {
                const o = {}
                for( let i=0; i< dependencies.length; i++ )
                    o[names[i]] = state[dependencies[i]]

                return o
            }
        }

        areStatesEqual = ( prev, next ) =>
            dependencies.every( name => prev[name] == next[name] )

    } else {
        areStatesEqual = ( prev, next ) => true
    }

    return ReacRedux.connect( mapStateToProps, mapDispatchToProps, null, { pure: true, areStatesEqual } )
}
