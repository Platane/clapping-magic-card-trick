import emoji                        from 'js-emoji-fork'

// always fucks up at init
// the first one to be parsed is fucked
// yolo
emoji.allow_native  = true
emoji.colons_mode   = false
emoji.replace_mode  = 'unified'
emoji.replace_colons( ':pear:' )

export const emojify = text => {

    emoji.allow_native  = true
    emoji.colons_mode   = false
    emoji.replace_mode  = 'unified'
    return emoji.replace_colons( text || '' )
}

export const unemojify = text => {

    emoji.colons_mode = true
    return emoji.replace_unified( text || '' )
}
