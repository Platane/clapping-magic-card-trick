import {connect}            from '../../util/connect'
import {Embed as C}         from './component'

export const Embed = connect(
    [
        'selectedVersion'
    ],

    ( selectedVersion ) =>
        ({ url : selectedVersion && selectedVersion.url })

)( C )