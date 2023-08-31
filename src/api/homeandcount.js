import requset from '../utils/request'

// 获取用户统计信息
export function findUserStatus(param) {
    return requset({
        url: `/home/getUserStatus`,
        method: 'get',
        data: param
    })
}