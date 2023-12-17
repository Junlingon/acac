import React from "react"

import classnames from 'classnames'
import { LEFT_TOP_TAG, RIGHT_BOTTOM_TAG } from '@constants/fusion'

import styles from './fusionHeader.module.less'

const FusionHeader = ({
  roleList,
  activeId,
  onRoleChange,
}) => {

  const handleRoleClick = (role) => {
    onRoleChange(role)
  }

  return (
    <div className={styles['fusion-header']}>
      {roleList.map((role, index) => {
        return (
          <div
            key={index}
            className={classnames({
              [styles['role-container']]: true,
              [styles['active']]: activeId === role.id,
              [styles['lock']]: !role.unlocked
            })}
            onClick={() => handleRoleClick(role)}
          >
            {/* 角色头像 */}
            <div className={styles['role-avatar-wrap']}>
              {/* 左上角角标 */}
              {role.label && (
                <div
                  style={{
                    backgroundImage: `url(${LEFT_TOP_TAG[role.label].image})`
                  }}
                  className={classnames([
                    styles['role-leftTop-tag'],
                    styles[LEFT_TOP_TAG[role.label].class]
                  ])}
                ></div>
              )}
              {/* 右下角角标 */}
              {role.unlockType && (
                <div
                  style={{
                    backgroundImage: `url(${RIGHT_BOTTOM_TAG[role.unlockType].image})`
                  }}
                  className={classnames([
                    styles['role-rightBottom-tag'],
                    styles[RIGHT_BOTTOM_TAG[role.unlockType].class]
                  ])}
                ></div>
              )}
              <img className={styles['role-avatar']} src={role.avatar} alt="" />
              {/* 边框 */}
              <div className={styles['role-avatar-border']}></div>
              {/* 背景 */}
              <div className={styles['role-avatar-bg']}></div>
            </div>
            {/* 角色名 + 碎片数量 */}
            <div className={styles['role-name']}>
              {role.name}
              {`${role.ownedFragmentList?.reduce((pre, cur) => { cur.owned > 0 && pre++; return pre }, 0) || 0}/${role.totalFragments}`}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FusionHeader