import {connect}            from '../../util/connect'
import {Embed as C}         from './component'
import {selectVersion}      from '../../action'

export const Embed = connect(
    [
        'selectedVersion'
    ],

    ( selectedVersion ) =>
        ({ url_indexJs : selectedVersion && selectedVersion.url_indexJs })

)( C )