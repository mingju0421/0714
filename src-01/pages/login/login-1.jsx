import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox, Result,message } from 'antd';
import {Redirect} from 'react-router-dom'

import './login.less'
import logo from './images/logo.png'
import  { reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'


 

class Login extends Component{
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, {username,password}) => {
          if (!err) {
            const result = await reqLogin(username,password)
            if(result.status === 0){
                const user = result.data
                storageUtils.saveUser(user)
                memoryUtils.user = user

                this.props.history.replace('/')
                message.success('登录成功')
            }else{
                message.error(result.msg)
            }
          }
        });
      };

      validatePwd = (rule, value, callback) => {
        // 1).必须输入
        // 2).必须大于等于4位
        // 3).必须小于等于12位
        // 4).必须是英文、数字或下划线组成
        value = value.trim()
        if (!value) {
          callback('密码必须输入')
        } else if (value.length<4) {
          callback('密码不能小于4位')
        } else if (value.length>12) {
          callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
        } else {
          callback() // 验证通过
        }
      }
    
    render(){
        // console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <div className="header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="conter">
                    
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <h2>用户登录</h2>
                        <Form.Item>
                        {getFieldDecorator('username',{
                            initialValue:'',
                            rules:[
                                 // 声明式验证: 使用插件已定义好的规则进行验证
                                 // 1).必须输入
                                 // 2). 必须大于等于4位
                                 // 3). 必须小于等于12位
                                 // 4). 必须是英文、数字或下划线组成
                                 {required:true,whitespace:true,message:'用户名必须输入'},
                                 {min:4,message:'用户名不能小于等于4位'},
                                 {max:12,message:'用户名不能大于12为'},
                                 {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文,数字或者下划线组成'}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password',{
                            initialValue:'',//初始值,防止initialValue.tirm()报错
                            rules:[{validator:this.validatePwd}]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />
                        )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
            </div>
        )
    }
}
const WarpperForm = Form.create()(Login)
export default WarpperForm