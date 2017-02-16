import React                    from 'react'
import {SizeGraph}              from '../sizeGraph'
import {Embed as Embed_iframe}  from '../embed.iframe'
import {Embed as Embed_eval}    from '../embed.eval'

import style    from './style.css'

const Embed = Embed_iframe

export const App = () =>
    <div className={style.container}>

        <div className={style.embed}>
            <Embed />
        </div>

        <div className={style.sizeGraph}>

            <div className={style.sizeGraphShadow} />

            <SizeGraph width={400} height={80}/>

        </div>

    </div>
