import requset from '../utils/request'

// 获取电影列表查询
export function findMovie(param) {
    return requset({
        url: `/movie/findMovie`,
        method: 'get',
        data: param
    })
}

// 获取电影类型列表查询
export function findCategory(param) {
    return requset({
        url: `/movie/findAllCategory`,
        method: 'get',
        data: param
    })
}

//上传图片
export function upLoad(param) {
    return requset({
        url: `/movie/upLoad`,
        method: 'post',
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

// 显示一条电影信息
export function findMovieOne(id) {
    return requset({
        url: `/movie/findMovieOne/${id}`,
        method: 'get',
    })
}


// 删除电影信息
export function deleteMovie(id) {
    return requset({
        url: `/movie/deleteMovie/${id}`,
        method: 'post',
    })
}
