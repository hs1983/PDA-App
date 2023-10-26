import request from '@/utils/request'

//根据包件号获取组盘包件信息
export function getPalletCombination(sku) {
    return request({
      url: '/api/pm0638/dg/getcombinatiolist?sku='+sku,
      method: 'get'
    })
  }


  //根据包件条码查询包件所属齐套类型所有包件
export function getMatchPackageList(sku) {
  return request({
    url: '/api/pm0638/dg/getmatchpackagelist?sku='+sku,
    method: 'get'
  })
}


  //保存组盘信息
  export function savePalletCombination(data) {
    return request({
      url: '/api/pm0638/dg/createpalletcombination',
      method: 'post',
      data
    })
  }