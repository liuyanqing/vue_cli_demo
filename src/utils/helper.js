/**
 * 标准创建时间格式 new Date(y, m, d, h, M, s, ms)
 * 如果对于时间格式比较复杂的情况，可参考 Moment 库 http://momentjs.com/
 *
 * @param input 支持 yyyy-MM-dd HH:mm:ss.SSS 或 yyyy-MM-dd HH:mm:ss:SSS 或 yyyy/MM/dd HH:mm:ss.SSS
 * 2016-06-02 13:01:50.333  2016-06-02 13:01:50:333 2016/06/02 13:01:50:333
 * 标准写法为 2016-06-02T05:01:50.333Z
 * @returns {Date}
 */
export const createDate = input => {
  if (!input || typeof input !== 'string') {
    return null;
  }
  let y = 0,
    m = 0,
    d = 0,
    h = 0,
    M = 0,
    s = 0,
    ms = 0;
  const inputs = input.replace(/\//g, '-').split(' ');
  if (inputs.length > 0) {
    const ymd = inputs[0].split('-');
    y = Number(ymd[0]);
    m = Number(ymd[1]) - 1;
    d = Number(ymd[2]);
  }
  if (inputs.length === 2) {
    const hms = inputs[1].split(':');
    h = Number(hms[0]);
    M = Number(hms[1]);
    // 格式 2016-06-02 13:01:50.333
    const sms = hms[2].split('.');
    if (sms.length === 2) {
      s = Number(sms[0]);
      ms = Number(sms[1]);
    } else {
      s = Number(hms[2]);
    }
    // 格式 2016-06-02 13:01:50:333
    if (hms[3]) {
      ms = hms[3];
    }
  }
  return new Date(y, m, d, h, M, s, ms);
};

/**
 * 时间格式转换
 * @param time
 * @param showMs 是否显示毫秒
 * @param showYear 是否显示年
 * @param shortYear 短格式年
 * @returns {*}
 */
export const formatDate = (time, {
  showMs = false,
  showTime = false,
  showYear = true,
  shortYear = false,
} = {}) => {
  if (!time) {
    time = new Date()
  }

  let date = time;

  if (!(time instanceof Date)) {
    date = new Date(Number(time));
    // 在 ios 下需要显式的转换为字符串
    if (date.toString() === 'Invalid Date') {
      date = createDate(time);
      if (date.toString() === 'Invalid Date') {
        return '';
      }
    }
  }

  const H = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
  const M =
    date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
  const S =
    date.getSeconds() <= 9 ? '0' + date.getSeconds() : date.getSeconds();
  let MS = date.getMilliseconds();
  if (MS <= 9) {
    MS = '00' + MS;
  } else if (MS <= 99) {
    MS = '0' + MS;
  }

  const hms = showMs ? ` ${H}:${M}:${S}.${MS}` : ` ${H}:${M}:${S}`;
  let year = date.getFullYear();
  if (shortYear) {
    year %= 100;
    if (year < 10) {
      year = '0' + year;
    }
  }

  let month = date.getMonth() + 1;
  month = month <= 9 ? '0' + month : month;

  let day = date.getDate();
  day = day <= 9 ? '0' + day : day;

  return (
    (showYear ? year + '-' : '') + month + '-' + day + (showTime ? hms : '')
  );
};

// 小数转换为百分比数
export const toPercentNum = (num, percent, fixed = 3) => {
  num = Number(num);
  if (isNaN(num)) {
    return percent ? '%' : '';
  }
  return (num * 100).toFixed(fixed) + (percent ? '%' : '');
};

// 小数转换为百分比数
export const toPercent = num => toPercentNum(num, true);

// 金额格式化 千分位
export const formatAmount = (num, fixed = 2, split = false) => {
  num = Number(num);
  if (isNaN(num) || !isFinite(num)) {
    // 如果 NaN或者不是Finite 返回 ''
    return '--';
  }
  if (typeof fixed === 'boolean') {
    split = fixed;
    fixed = 2;
  }

  const n = num.toFixed(fixed || 2);
  const re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;

  if (fixed === 0) {
    const a = n.replace(re, '$1,').split('.');
    return a[0];
  }

  if (split) {
    return n.replace(re, '$1,').split('.');
  }
  return n.replace(re, '$1,');
};
