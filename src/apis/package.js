import request from '@/utils/request'

//根据包件号获取组盘包件信息(拣货装车)
export function getPalletizeList(sku) {
    return request({
      url: '/api/pm0638/loadingcarsheet/getpalletizelist?sku='+sku,
      method: 'get'
    })
  }



  //提交拣货信息
export function submitPackInfo(data) {
    return request({
      url: '/api/pm0638/loadingcarsheet/submitpackinfo',
      method: 'post',
      data
    })
  }
  