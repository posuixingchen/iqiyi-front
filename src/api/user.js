import requset from '../utils/request'

// 获取用户名和密码查询
export function login(form) {
    return requset({
        url: `/user/login/${form.name}/${form.password}`,
        method: 'post'
    })
}

// 注册用户信息
export function register(form) {
    return requset({
        url: `/user/register`,
        method: 'post',
        data: form
    })
}
