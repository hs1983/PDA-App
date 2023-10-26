import request from '@/utils/request'



//获取待出货订单
export function getDeliveryOrderList(order) {
  return request({
    url: '/api/pm0638/arrangevehiclesform/getdeliveryorderlist?order=' + order,
    method: 'get'
  })
}

//获取出库口列表
export function getPutOutExitList(type) {
  return request({
    url: '/api/wms/location/query?AreaId=1&Page.Index=1&Page.Size=100&LocationType=' + type,
    method: 'get'
  })
}

//根据排车单和出库口创建出库单
export function createShipmentByOrder(data) {
  return request({
    url: 'api/instockinfo/create-order-by-arrange',
    method: 'post',
    data
  })
}



//空托盘出库
export function containerPutout(container, exit) {
  return request({
    url: '/api/instockinfo/create-order-by-container?container=' + container + '&exit=' + exit,
    method: 'get'
  })
}


//查询可出库空托垛
export function getcontainerList() {
  return request({
    url: '/api/pm0638/dg/getemptycontainer/get-empty-container',
    method: 'get'
  })
}

