import React    from 'react'


import style    from './style.css'

const merge = ( ...args ) =>
    args.filter( Boolean ).join(' ')

const precompute = next => props => {

    const f = x => x

    const items = []
    props.history.forEach( (x,i) =>
        items[i] = ({
            y : i == 0
                ? 0
                : items[i-1].date + f( x.date - props.history[i-1].date )
            ,
            ...x
        })
    )

    return next({ ...props, items })
}

const Item = ({ date }) =>
    <div className={style.itemContainer} >
        { date }
    </div>


export const VersionList = precompute(
    ({ items }) =>
        <div className={style.container} >
            <div className={style.list} >
                { items
                    .map( item =>
                        <div key={item.id} className={style.item} style={{ transform: `translate3d(0,${0}px,0)` }}>
                            <Item {...item} />
                        </div>
                    )
                }
            </div>
       </div>
)