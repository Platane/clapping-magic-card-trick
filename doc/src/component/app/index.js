import React                    from 'react'
import {SizeGraph}              from '../sizeGraph'
import {VersionList}            from '../list'
import {Embed as Embed_iframe}  from '../embed.iframe'
import {Embed as Embed_eval}    from '../embed.eval'

import style    from './style.css'

const Embed = Embed_iframe

export const App = () =>
    <div className={style.container}>

        <div className={style.embed}>
            <Embed />
        </div>

        <div className={style.footer}>
            <div className={style.footerShadow} />

            <div className={style.sizeGraph}>
                <SizeGraph width={400} height={80}/>
            </div>

            <div className={style.versionList}>
                <VersionList/>
            </div>

        </div>

    </div>
