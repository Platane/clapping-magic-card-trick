import React            from 'react'
import {Motion, spring} from 'react-motion'

import style            from './style.css'
import {Icon}           from '../icon'


export const VersionInfo = ({ size, id, url, url_indexJs_commit }) =>
    <div className={style.container} >

        <Motion defaultStyle={{ size:0 }} style={{ size: spring(0|size) }}>
            {
                ({ size }) =>
                    <div key={id+'0'} className={style.size} >{ (0|size)+' octet' }</div>
            }
        </Motion>

        <div className={style.links} >
            { url &&
                <a key={id+'1'} className={style.demoUrl} href={url} title="full screen" >
                    <Icon glyph="fullscreen" />
                </a>
            }
            { url_indexJs_commit &&
                <a key={id+'2'} className={style.sourceUrl} href={url_indexJs_commit} title="source">
                    <Icon glyph="github" />
                </a>
            }
        </div>
    </div>
