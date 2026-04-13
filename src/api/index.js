import request from './request.js';

export const getReportData = () => {
    return request({
        method: 'GET',
        url: '/reportdata',
    })
}