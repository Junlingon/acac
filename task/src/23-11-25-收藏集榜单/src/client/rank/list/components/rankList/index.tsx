import React from 'react';

import { linkJump } from '@bilibili/utils-leona';
import { bfsImg } from '../../../../../utils/common';

import './rankList.less';

const RankList = ({ list, onShowMore, isShowMore }) => {
    const className = 'dress-award-list-bottom-list-rank';

    return <>
        <div className={className}>
            {(list && list.length > 3) &&
                <div className={`${className}-header`}>
                    <div className={`${className}-header-cell`}>名次</div>
                    <div className={`${className}-header-cell`}>收藏集</div>
                    <div className={`${className}-header-cell`}>积分</div>
                    <div className={`${className}-header-cell`}>前往收藏集</div>
                </div>
            }
            {list && list?.map((item) => (
                <div className={`${className}-item`} key={item.act_id}>
                    <div className={`${className}-item-cell`}>{item.rank}</div>
                    <div className={`${className}-item-cell`}>
                        <div className="box">
                            <div className="avt" style={{ backgroundImage: `url(${bfsImg(item.act_cover?.replace(/^http:/g, 'https:'), 62)})` }}></div>
                            <div className="name">{item.act_name}</div>
                        </div>
                    </div>
                    <div className={`${className}-item-cell`}>{item.score}</div>
                    <div
                        className={`${className}-item-cell`}
                        onClick={() => { linkJump({ link: `https://www.bilibili.com/h5/mall/digital-card/home?-Abrowser=live&act_id=${item.act_id}` }) }}>
                        前往助力
                    </div>
                </div>
            ))}

            <div className={`${className}-footer`}>
                {isShowMore && <div className="btn" onClick={onShowMore}></div>}
                <div className="desc">活动结束后，榜单截止并公开</div>
            </div>
        </div>
    </>
}

export default RankList;
