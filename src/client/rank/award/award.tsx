import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import {
    curMainTabAtom,
    curSubTabAtom,
} from '../../../jotai/common';

import './award.less';

const Award = () => {
    const [curMainTab] = useAtom(curMainTabAtom);
    const [curSubTab] = useAtom(curSubTabAtom);
    const className = 'dress-award-list-bottom-warp';

    return <>
        <div className={`${className}`}>
            <div className={`${className}-tittle`}>
                {curMainTab.name === '更多榜单' ? null : curMainTab.name}{curSubTab.name}冠军奖励
            </div>
            <div className={`${className}-content`}>
                {
                    curSubTab.awardList.map((item) => (
                        <div className={`${className}-content-item`} key={item.name}>
                            <div className={`${className}-avt`} style={{ backgroundImage: `url(${item.image}) ` }}></div>
                            <div className={`${className}-name`}>{item.name}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
}

export default Award;
