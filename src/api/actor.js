import requset from '../utils/request'

//查询演员列表
export function findActor(param) {
    return requset({
        url: `/actor/findActor`,
        method: 'get',
        data: param
    })
}

//查询所有演员地区
export function findAllRegion(param) {
    return requset({
        url: `/actor/findAllRegion`,
        method: 'get',
        data: param
    })
}

//查询一条演员列表
export function findActorOne(id) {
    return requset({
        url: `/actor/findActorOne/${id}`,
        method: 'post',
    })
}


//删除一条演员记录
export function deleteActor(id) {
    return requset({
        url: `/actor/deleteActor/${id}`,
        method: 'post',
    })
}