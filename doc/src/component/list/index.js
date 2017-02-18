import {connect}            from '../../util/connect'
import {VersionList as C}     from './component'
import {selectVersion}      from '../../action'

export const VersionList = connect(
    [
        'history',
        'selectedVersion'
    ],

    ( history, selectedVersion ) =>
        ({ history, selectedVersionId : selectedVersion && selectedVersion.id })
    ,

    { selectVersion }
)( C )