import Mock from 'mockjs'

export default ({ mock }) => {
    if (!mock) return;
    Mock.mock('/api/blade-erp/logisticsTray/page', 'post', () => {
        return {
            data: {
                reocrds: [{
                    id: 1,
                    name: '张三',
                    value: '111',
                    code: '1111',
                    note: '客户'
                }, ],
                total: 2,
            }
        }
    })

}