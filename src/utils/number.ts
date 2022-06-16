import { isNullOrUnDef } from './is';

// 两位小数
export const thousandth = (value: string, auto = true) => {
  if (isNullOrUnDef(value)) return;
  const val = value + '';
  const reg = /^(-)*(\d+)\.(\d\d).*$/;
  const str = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg, '$1$2.$3');
  const sp = str.split('.');
  // 自动补全小数位
  if (auto) {
    return [sp[0], sp[1] ? sp[1].padEnd(2, '0') : '00'].join('.');
  } else {
    return str;
  }
};
// 不带小数
export const isInterThousandth = (value: string) => {
  if (isNullOrUnDef(value)) return;
  const val = value + '';
  const reg = /^(-)*(\d+)\.().*$/;
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg, '$1$2');
};
