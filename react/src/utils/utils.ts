
/**
 * 格式化数字为千分位的数字
 */
export function formatNumber2Qfw(str: any) {
  if (!str) {
    str = '';
  }
  str = str + '';
  let minus = false;
  if (str.length > 1) {
    if (str.substring(0, 1) == '-') {
      minus = true;
      str = str.substring(1);
    }
  }
  const DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  const MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  str = str.replace(DIGIT_PATTERN, (m: string) => m.replace(MILI_PATTERN, ','));
  if (minus) {
    str = '-' + str;
  }
  return str;
}
export function getFileSize(size: number) {
  let fileSize = size / 1024;
  let suffix = 'KB';
  if (fileSize >= 1024) {
    fileSize = fileSize / 1024;
    suffix = 'MB';
  }
  const value = fileSize.toFixed(2);
  return value + suffix;
}
export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getJiaTableCellNameMap(jiaGrid: any, cellNameRow: number) {
  const m = new Map();
  if (jiaGrid) {
    for (let col = 0; col < jiaGrid.getColumnCount(); col += 1) {
      const cellName = jiaGrid.getCellValue(cellNameRow, col);
      if (cellName) {
        m.set(cellName, col);
      }
    }
  }
  return m;
}
export function getObjectBadgeCount(obj: any, ignoreKey: Array<string> | null, dataKey: Array<string> | null, boolKey: Array<string> | null) {
  let ret = 0;
  if (obj) {
    for (const key of Object.keys(obj)) {
      if (ignoreKey && ignoreKey.includes(key)) {
        continue;
      }
      if (obj[key]) {
        if (boolKey && boolKey.includes(key)) {
          if (obj[key]) {
            //console.log(key + ':' + obj[key]);
            ret++;
          }
        }
        else if (dataKey && dataKey.includes(key)) {
          if (obj[key] != 0) {
            //console.log(key + ':' + obj[key]);
            ret++;
          }
        }
        else {
          if (obj[key].toString().length > 0) {
            //console.log(key + ':' + obj[key]);
            ret++;
          }
        }
      }
    }
  }
  return ret;
}

export function digitUppercase(n: number) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 验证是否身份证号合法
 * @param {身份证号码} idcard 
 */
export function checkIdNum(idcard: string) {
  idcard = idcard.toUpperCase();
  const Errors = ["验证通过!", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!"];
  const area: any = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江",
    34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川",
    52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
  };

  let Y, JYM;
  let S, M;
  let idcard_array = new Array<string>();
  idcard_array = idcard.split("");
  /*地区检验*/
  if (area[parseInt(idcard.substr(0, 2), 10)] == null) {
    //alert(Errors[4]);
    //return false;
    return Errors[4];
  }
  let ereg;
  /*身份号码位数及格式检验*/
  switch (idcard.length) {
    case 15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
        //测试出生日期的合法性 
      }
      else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
        //测试出生日期的合法性 
      }
      if (ereg.test(idcard)) {
        //alert(Errors[0] + "15");
        //return true;
        return "";
      }
      else {
        //alert(Errors[2]);
        //return false;
        return Errors[2];
      }
    case 18: //18位身份号码检测 
      //出生日期的合法性检查  
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8])) 
      if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
        //闰年 出生日期的合法性正则表达式 
      }
      else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        //平年出生日期的合法性正则表达式 
      }
      if (ereg.test(idcard)) {
        //测试出生日期的合法性 //计算校验位 
        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        /*判断校验位*/
        if (M == idcard_array[17]) {
          //alert(Errors[0] + "18");
          //return true;
          return "";
          /*检测ID的校验位*/
        }
        else {
          //alert(Errors[3]);
          //return false;
          return Errors[3];
        }
      }
      else {
        //alert(Errors[2]);
        //return false;
        return Errors[2];
      }
    default:
      //alert(Errors[1]);
      //return false;
      return Errors[1];
  }
}