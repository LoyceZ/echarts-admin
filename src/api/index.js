import request from './request.js';

export const getReportData = () => {
    return request({
        method: 'GET',
        url: '/reportdata',
    })
}

export const getSalesData = () => {
    return request({
        method: 'GET',
        url: '/saledata',
    })
}

export const getKeywordsData = () => {
    return request({
        method: 'GET',
        url: '/keyworddata',
    })
}

export const getCategoryData = () => {
    return request({
        method: 'GET',
        url: '/categorydata',
    })
}

export const getMapData = () => {
    return request({
        method: 'GET',
        url: '/mapdata',
    })
}