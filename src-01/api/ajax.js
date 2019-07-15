import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

//添加请求拦截器:让post请求的请求体格式为urlcoded格式a=1&b2
//在真正发请求前执行
// axios.interceprots.request.use(function(config){
axios.interceptors.request.use(function (config) {
    //得到请求方式和请求体数据
    const {method,data} = config
    //处理post请求,将data对象转换成query参数格式字符串
    if(method.toLowerCase() === 'post' && typeof data === 'object'){
        config.data = qs.stringify(data) //username = admin&password=admin
    }
    return config;
})

axios.interceptors.response.use(function(response){
    return response.data //返回的结果就会交给我们指定的请求响应的回调
},function(error){//统一处理所有请求的异常错误
    message.error('请求出错'+error.message)
    return new Promise(()=>{})
});
export default axios