import request from './request'

// const api_url = 'https://wxapp.zhongfund.cn/api/v1'
const api_url = 'http://localhost:8080/api/v1'
const api = {
    api_url:api_url,
    //登陆
    getToken:(item)=>request.post(`${api_url}/login`,{
        phone:item.phone,
        password: item.password
    }),
    getUsers:(id)=>request.get(`${api_url}/admin/user/listMP/${id}`,id),
    addUser:(user)=>request.post(`${api_url}/admin/user`,user),
    deleteUser:(id)=>request.delete(`${api_url}/admin/user/${id}`),
    updateUser:(user)=>request.put(`${api_url}/admin/user/${user.id}`,user),

    getFunds:()=>request.get(`${api_url}/admin/funds`),
    addFund:(fund)=>request.post(`${api_url}/admin/fund`,fund),
    deleteFund:(id)=>request.delete(`${api_url}/admin/fund/${id}`),
    updateFund:(fund)=>request.put(`${api_url}/admin/fund/${fund.id}`,fund),
    getFund:(id)=>request.get(`${api_url}/admin/fund/${id}`),

    getCompanys:(id)=>request.get(`${api_url}/admin/companys/${id}`),
    addCompany:(company)=>request.post(`${api_url}/admin/company/${company.fund_id}`,company),
    deleteCompany:(id)=>request.delete(`${api_url}/admin/company/${id}`),

    getCompnayReports:(id)=>request.get(`${api_url}/admin/reports/${id}`),
    addCompanyReport:(report)=>request.post(`${api_url}/admin/report/${report.company_id}`,report),
    deleteCompanyReport:(id)=>request.delete(`${api_url}/admin/report/${id}`),

    getCompnayNews:(id)=>request.get(`${api_url}/admin/news/${id}`),
    addCompanyNew:(news)=>request.post(`${api_url}/admin/new/${news.company_id}`,news),
    deleteCompanyNew:(id)=>request.delete(`${api_url}/admin/new/${id}`),

    updateFundData:(fund)=>request.put(`${api_url}/admin/fund/data/${fund.id}`,fund),
    updateFundReport:(fund)=>request.put(`${api_url}/admin/fund/report/${fund.id}`,fund),

    getProductInfosData:(query)=>request.get(`${api_url}/admin/productInfo/listMP/${query.name}/${query.batch}/${query.openStat}/${query.active}/${query.sn}/${query.out}/${query.in}/${query.artifact}/${query.pageNo}`)
}
export default api 