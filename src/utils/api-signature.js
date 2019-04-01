/**
 * @ Dsec: API请求签名
 *         目前只有秒贴未登录状态下的OCR用到
 * @ Author: lizhiyang1
 * @ Date: 2019/3/19
 */

import jsSHA from 'jssha';

export const createNonceStr = () =>
  Math.random()
    .toString(36)
    .substr(2, 15);

export const sha = str => {
  const shaObj = new jsSHA('SHA-1', 'TEXT');
  shaObj.update(str);
  return shaObj.getHash('HEX');
};

// 拼装url
export const raw = (args = {}) => {
  let string = '';
  const keys = Object.keys(args).sort();
  keys.forEach(item => {
    string += `&${item}=${encodeURIComponent(args[item])}`;
  });
  string = string.substr(1);
  return string;
};

export const signature = () => {
  const nonceStr = createNonceStr();
  const timestamp = new Date().valueOf();
  const referer = location.href;
  const ret = { nonceStr, timestamp, referer };

  return {
    signature: sha(raw(ret)),
    timestamp,
    nonceStr,
  };
};

export default signature;
