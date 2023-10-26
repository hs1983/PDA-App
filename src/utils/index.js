import CryptoJS from 'crypto-js'

/**
 * des 加密
 * @param {} code
 * @returns
 */
export function encrypt(code) {
  // const key = process.env.SecretKey
  const secretString = CryptoJS.AES.encrypt(code, CryptoJS.enc.Utf8.parse('Tungray8'), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return secretString
}

/**
 * des 解密
 * @param {*} code
 * @returns
 */
export function decrypt(secretCode) {
  // const key = process.env.SecretKey
  const code = CryptoJS.AES.decrypt(secretCode, CryptoJS.enc.Utf8.parse('Tungray8'), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)
  return code
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

//对象去重For循环
export function ObjToRepeatByFor(arrays) {

  let result = [];
  let obj = [];
  let str;
  for (let i = 0; i < arrays.length; i++) {
    str = JSON.stringify(arrays[i]);
    if (obj.indexOf(str) == -1) {
      result.push(arrays[i]);
      obj.push(str);
    }
  }
  return result
}


export function JsNewGuid() {
  var curguid = ''
  for (var i = 1; i <= 32; i++) {
    var id = Math.floor(Math.random() * 16.0).toString(16)
    curguid += id
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { curguid += '-' }
  }
  return curguid
}


/**
 * 获取系统时间yyyy-MM-dd格式
 */
 export function getSystemDate() {
  var nowDate = new Date()

  var year = nowDate.getFullYear()

  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)

    : nowDate.getMonth() + 1

  var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate

    .getDate()

  var dateStr = year + '-' + month + '-' + day
  return dateStr
}


/**
 * 获取指定时间yyyy-MM-dd格式
 */
 export function getSpecifyDate(d) {

  var time=(new Date()).getTime()+d*24*60*60*1000;
  var nowDate=new Date(time);

  var year = nowDate.getFullYear()

  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)

    : nowDate.getMonth() + 1

  var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate

    .getDate()

  var dateStr = year + '-' + month + '-' + day
  return dateStr
}

/**
 * 获取指定时间yyyy-MM-dd HH:mm:ss格式
 */
export function getSystemTime() {
  var nowDate = new Date()

  var year = nowDate.getFullYear()

  var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)

    : nowDate.getMonth() + 1

  var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate

    .getDate()

  var hour = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate

    .getHours()

  var minute = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate

    .getMinutes()

  var second = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate

    .getSeconds()

  var dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return dateStr
}


const os = require('os');
 
export function getNetworkIp() {
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
    // console.log("network",network)
		for (let dev in network) {
 
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
          // console.log("alias.address",alias.address)
				}
        // console.log("alias",alias)
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}