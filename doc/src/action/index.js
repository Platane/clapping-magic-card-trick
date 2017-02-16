export const initHistory = ( history ) =>
    ({
        type    : 'initHistory',
        history
    })

export const selectVersion = ( id ) =>
    ({
        type    : 'selectVersion',
        id
    })