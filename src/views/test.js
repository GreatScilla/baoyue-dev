import request from '@/router/axios.js'

export const getList = (data) => {
    return request({
        url: '/test',
        method: 'get',
        data: data
    })
}
export const del = (id) => request.delete('api/test', {
    params: {
        id
    }
})
export const add = (data) => request({
    url: '/test',
    method: 'post',
    data: data
})
export const update = (data) => request({
    url: '/test',
    method: 'put',
    data: data
})