import Bjax from "@bilibili/bjax";
const http = new Bjax();

// 创单
export const judge = () => {
  return http.get("api.bilibili.com/x/vip/auto_renew/status", {
    type: 1,
    t: new Date().getTime(),
  });
};

export const $getUserInfo = () => {
  return http.get(`//api.bilibili.com/x/web-interface/nav`, {
    t: new Date().getTime(),
  });
};

export const $getLimitStatus = (act_token: number) => {
  return http.get(`//api.bilibili.com/x/vip/activity/limit`, {
    act_token,
    t: new Date().getTime(),
  });
};
