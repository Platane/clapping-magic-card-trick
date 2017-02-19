import React        from 'react'
import {emojify}    from '../../../util/emoji'

import style    from './style.css'

const merge = ( ...args ) =>
    args.filter( Boolean ).join(' ')


const zeroPadding = ( n, x ) => '0'.repeat(n-x.toString().length)+x


const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
]


const toDate = date => {
    const a = new Date(date)
    return [
            months[ a.getMonth() ]
            +' '
            +zeroPadding(2,a.getDate())
        ,
            zeroPadding(2,a.getHours())
            +':'
            +zeroPadding(2,a.getMinutes())
        ]
}

export const itemHeight = 20
export const Item = ({ date, message, selected,     select }) =>
    <div className={merge(style.item, selected&&style.itemSelected)} onClick={select}>
        <div className={style.date} >
            <div className={style.day} >{ toDate(date)[0] }</div>
            <div className={style.time} >{ toDate(date)[1] }</div>
        </div>
        <div className={style.message} >{ emojify(message) }</div>
    </div>