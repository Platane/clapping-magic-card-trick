import React    from 'react'


import style    from './style.css'

const merge = ( ...args ) =>
    args.filter( Boolean ).join(' ')

const precompute = next => props => {

    const {history, selectedVersionId} = props

    const maxY = history.reduce( (max,o) => Math.max( max, o.size ), 1024 )
    const minX = history.length > 0 ? history[0].date : 0
    let maxX = history.length > 1 ? history[history.length-1].date : minX+1

    maxX += ( maxX - minX ) * 0.05

    return next({ ...props, maxY, minX, maxX, selected: history.find( ({id}) => id == selectedVersionId ) })
}

const margin = 10
export const SizeGraph = precompute(
    ({ selected, selectVersion, history, maxY, minX, maxX, width, height }) =>
        <svg className={style.container} viewBox={`${-margin} ${-margin} ${width+margin*2} ${height+margin*2}`} >

            <path className={style.line1k} d={`M0 ${(1-1024/maxY)*height}L${width} ${(1-1024/maxY)*height}`} />

            <path className={style.line0} d={`M0 ${height}L${width} ${height}`} />

            { history.length > 0 &&
                <path className={style.line}
                d={
                    [
                        `M${( history[0].date - minX )/( maxX - minX )*width} ${(1-history[0].size/maxY)*height}`,
                        ...history.map( ({ size, date }) => `L${( date - minX )/( maxX - minX )*width} ${(1-size/maxY)*height}` )
                    ].join('')
                }
                />
            }

            { history
                .map( ({ id, message, commit, size, date }) =>
                    <g key={id} transform={`translate(${ ( date - minX )/( maxX - minX )*width },${ (1-size/maxY)*height })`}>

                        <circle className={merge(style.dot, selected.id==id && style.selectDot)} r={1.3} cx={0} cy={0} />

                        <circle className={style.invisible} r={2.2} cx={0} cy={0} onClick={selectVersion.bind(null, id)} />
                    </g>
                )
            }

            { selected &&
                <g transform={`translate(${ ( selected.date - minX )/( maxX - minX )*width },${ (1-selected.size/maxY)*height })`}>
                    <circle className={merge(style.dot,style.selectDot)} r={1.3} cx={0} cy={0} />
                </g>
            }
        </svg>
)