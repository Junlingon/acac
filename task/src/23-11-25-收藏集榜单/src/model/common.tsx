export interface UserInfo {
  isLogin: boolean
  uname: string
  face: string
  mid: string
}

export interface Image {
  url: string
  height: number
  width: number
}

export interface ICurMainTab {
  _index?: number;
  name: string;
  value?: number;
  subTabs: ICurSubTab[]
}

export interface ICurSubTab {
  name?: string;
  value?: number;
  awardTittle?: string;
  rankTittle?: string;
  awardList?: {
    name?: string;
    image?: string;
  }[];
}