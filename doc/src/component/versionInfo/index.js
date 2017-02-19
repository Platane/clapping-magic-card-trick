import {connect}            from '../../util/connect'
import {VersionInfo as C}   from './component'

export const VersionInfo = connect(
    [
        'selectedVersion'
    ],

    ( selectedVersion ) =>
        ({ ...(selectedVersion||{}) })

)( C )