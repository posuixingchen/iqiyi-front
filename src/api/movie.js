import requset from '../utils/request'

// 获取电影列表查询
export function findMovie(param) {
    return requset({
        url: `/movie/findMovie`,
        method: 'get',
        data: param
    })
}

// 新增电影信息
export function saveMovie(param) {
    return requset({
        url: `/movie/saveMovie`,
        method: 'post',
        data: param
    })
}
