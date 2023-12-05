import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';

import { curSubTabAtom } from '../../../jotai/common';

import './award.less';

const Award = () => {
    const [curSubTab] = useAtom(curSubTabAtom);
    const className = 'dress-award-list-bottom-warp';

    return <>
        <div className={`${className}`}>
            {curSubTab && <div className={`${className}-tittle`}>{curSubTab.awardTittle}</div>}
            <div className={`${className}-content`}>
                {curSubTab && curSubTab.awardList && curSubTab.awardList.map((item) => (
                    <div className={`${className}-content-item`} key={item.name}>
                        <div className={`${className}-avt`} style={{ backgroundImage: `url(${item.image}) ` }}></div>
                        <div className={`${className}-name`}>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    </>
}

export default Award;
