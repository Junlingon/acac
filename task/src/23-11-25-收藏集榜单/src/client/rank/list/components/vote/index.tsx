import React from 'react';

import { linkJump } from '@bilibili/utils-leona';
import { bfsImg } from '../../../../../utils/common';

import './vote.less';

const Vote = ({ award, data }) => {
    const className = 'dress-award-list-bottom-list-vote';

    return <>
        <div className={`${className}`}>
            <div className={`${className}-icon ${award}`}></div>
            <div className={`${className}-collections ${award}`}>
                <div className="image" style={{ backgroundImage: `url(${bfsImg(data.act_cover?.replace(/^http:/g, 'https:'), 192)})` }}></div>
                <div className="linear"></div>
                <div className={`${className}-collections-text`}>
                    {data.act_name && <div className={`${className}-collections-text-name`}>{data.act_name}</div>}
                    {data.score && <div className={`${className}-collections-text-points`}>积分值：{data.score}</div>}
                </div>
            </div>
            {data.act_id && <div className={`${className}-btn`} onClick={() => {
                linkJump({ link: `https://www.bilibili.com/h5/mall/digital-card/home?-Abrowser=live&act_id=${data.act_id}` })
            }}></div>}
        </div>
    </>
}

export default Vote;
