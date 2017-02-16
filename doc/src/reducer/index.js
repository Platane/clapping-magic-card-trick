export const history = ( action, list ) =>
    'initHistory' == action.type
        ? action.history
        : list || []

history.source = true




export const selectedVersion = ( action, history, version, _history ) => {

    if ( history.length > 0 && _history.length == 0 )
        version = history[ history.length -1 ]

    if ( 'selectVersion' == action.type )
        version = history.find( x => x.id == action.id )

    return version
}
selectedVersion.source = true
selectedVersion.dependencies = [ history ]
