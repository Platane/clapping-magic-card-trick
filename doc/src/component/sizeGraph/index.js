import {connect}            from '../../util/connect'
import {SizeGraph as C}     from './component'
import {selectVersion}      from '../../action'

export const SizeGraph = connect(
    [
        'history',
        'selectedVersion'
    ],

    ( history, selectedVersion ) =>
        ({ history, selectedVersionId : selectedVersion && selectedVersion.id })
    ,

    { selectVersion }
)( C )