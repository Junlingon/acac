import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';

import {
  curMainTabAtom,
  curSubTabAtom,
  curListDataAtom
} from '../../../jotai/common';
import { $getListInfo } from '../../../api/http';
import { cancellablePromise, searchObj } from '../../../utils/common';
import Vote from './components/vote';
import RankList from './components/rankList';

import './list.less';

let fetchListPromise: any = null

const List = () => {
  const [curMainTab] = useAtom(curMainTabAtom);
  const [curSubTab] = useAtom(curSubTabAtom);
  const [dataList, setDataList] = useAtom(curListDataAtom);
  const [page, setPage] = useState(2);
  const [isShowMore, setIsShowMore] = useState(true);

  const className = 'dress-award-list-bottom-list';

  const getList = async (page = 1) => {

    fetchListPromise && fetchListPromise.cancel()
    try {
      const fetchListPromise = cancellablePromise($getListInfo({
        rank_type: curMainTab.value,
        sub_rank_type: curSubTab.value,
        page,
        size: 50,
        year: searchObj.rank_year
      }))

      const result: any = await fetchListPromise.instance

      const { rank_list } = result;
      console.log('getList', rank_list);
      if (rank_list && rank_list.length < 50) {
        setIsShowMore(false);
      }
      else{setIsShowMore(true);}
      if (page === 1) {
        setDataList(rank_list)
      }
      else {
        setDataList([...dataList, ...rank_list])
      }
    }
    catch (error) {
      console.log('error');
    }
  }

  const onShowMore = () => {
    getList(page);
    setPage(page + 1);
  }

  useEffect(() => {
    getList();
    setPage(2);
  }, [curMainTab, curSubTab])

  return (
    <div className={`${className}`}>
      <div className={`${className}-header`}>
        <div className={`${className}-tittle`}>{curSubTab.rankTittle}</div>
        <div className={`${className}-border`}></div>
        <div className={`${className}-desc`}>12月8月-12月31日收藏集抽奖数累计</div>
      </div>
      {
        dataList && dataList.length !== 0 ?
          <>
            {/* 助力 */}
            {
              dataList.length === 2 ?
                <div className={`${className}-vote-warp`}>
                  <Vote award={'gold1'} data={dataList[0]}></Vote>
                  <Vote award={'silver'} data={dataList[1]}></Vote>
                </div> :
                <div className={`${className}-vote-warp`}>
                  {dataList[1] && <Vote award={'silver'} data={dataList[1]}></Vote>}
                  {dataList[0] && <Vote award={'gold'} data={dataList[0]}></Vote>}
                  {dataList[2] && <Vote award={'bronze'} data={dataList[2]}></Vote>}
                </div>
            }

            {/* 榜单 */}
            <RankList list={dataList.slice(3)} onShowMore={onShowMore} isShowMore={isShowMore}></RankList>
          </> :
          <div className={`${className}-vote-warp`}>
            <div className="empty"></div>
          </div>
      }
    </div>
  )
}

export default List;
