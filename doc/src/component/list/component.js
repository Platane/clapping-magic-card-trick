import React        from 'react'

import style        from './style.css'

import {Item,itemHeight}    from './item'
import {KeyBoardNav}        from './keyboardNav'

const precompute = next => props => {

    const f = x =>
        Math.max( itemHeight, Math.min( 45, 10 + x/( 0.1*60*60*1000 ) ) )

    const y = []
    props.history
        .forEach( (_,i) =>
            y[i] = i == 0
                ? 0
                : y[i-1] - f( props.history[i].date-props.history[i-1].date )
        )

    const y0 = y[ props.history.findIndex( ({id}) => id == props.selectedVersionId ) ] || 0

    const pos = 35

    const items = props.history.map( (x,i) => ({ ...x, y:y[i]-y0+pos }) )

    return next({ ...props, items })
}



export const VersionList = precompute(
    ({ items, selectedVersionId,   selectVersion }) =>
        <div className={style.container} >

            <KeyBoardNav versions={items} selectedVersionId={selectedVersionId} selectVersion={selectVersion} />

            <div className={style.list} >
                { items
                    .map( item =>
                        <div key={item.id} className={style.itemWrapper} style={{ transform: `translate3d(0,${0|item.y}px,0)` }}>
                            <Item {...item} selected={ item.id == selectedVersionId } select={ selectVersion.bind(null,item.id) } />
                        </div>
                    )
                }
            </div>
       </div>
)