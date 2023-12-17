import { useRef } from 'react'
import { useAtom } from 'jotai'
import { userInfoAtom, currentSelectItemAtom, statusAtom } from '@jotai/common'
import { buyAction } from '@utils/buy'
import { checkStatus } from '@utils/common'
import { errorMessage } from '@constants/index'
import { buyPropsAtom } from '@jotai/home'
import toast from '@bilibili/vanilla-toast'
import { BuyInfo } from '@model/home'

interface buyProps {
  success?: () => void
  cfrom: string
  isChecked?: boolean
  currentItem: BuyInfo
}

const useBuy = () => {
  const [userInfo] = useAtom(userInfoAtom)
  const [status] = useAtom(statusAtom)
  const [buyProps, setBuyProps] = useAtom(buyPropsAtom)

  const isBuying = useRef(false)
  const isChecking = useRef(false)

  const checkAndBuy = async (props: buyProps) => {
    console.log('去购买')
    if (isChecking.current) return false
    isChecking.current = true

    // 存储下参数显示弹窗丢掉的参数 - 协议点击之后也是需要上报的
    // @ts-ignore
    setBuyProps(props)

    // 是否在端内、登录
    try {
      await checkStatus({
        isLogin: userInfo.isLogin,
        status: status,
      })

      // 是否勾选协议
      if (!props.isChecked) {
        isChecking.current = false
        toast.info('协议未勾选')
        return false
      }

      isChecking.current = false
      buy(props)
    } catch (error) {
      isChecking.current = false
      return false
    }
  }

  const buy = async (props) => {
    if (isBuying.current) return false
    // 标志位
    isBuying.current = true

    const currentSku = props.currentItem
    try {
      if (currentSku) {
        const result = await buyAction({
          buyInfo: currentSku,
          props: buyProps || props,
          type: currentSku?.type,
        })

        isBuying.current = false
        // 购买成功才弹弹窗
        if (result) {
          // 先执行成功之后的方法
          // 万一没拿到的话就从 props 里面取
          const buyCallback = buyProps || props
          buyCallback && buyCallback?.success && buyCallback?.success()
          // 如果有奖励的话则显示弹窗
          if (result) {
            toast.info('购买成功')
          }
        }
      }
    } catch (error) {
      isBuying.current = false
      toast.error(errorMessage)
    }
  }

  return {
    checkAndBuy,
    buy,
  }
}

export default useBuy
