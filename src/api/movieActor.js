import requset from '../utils/request'

//保存电影与演员数据
export function saveMovieActor(form) {
    return requset({
        url: `/MovieActor/saveMovieActor`,
        method: 'post',
        data: form,
    })
}