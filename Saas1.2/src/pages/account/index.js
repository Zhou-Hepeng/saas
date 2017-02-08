"use strict";

import React from 'react';
import {Button,
    Toast,
    TextArea,
    ButtonArea,
    Form,
    FormCell,
    CellHeader,
    Label,
    Input,
    Cells,
    Cell,
    CellFooter,
    Dialog,
    CellBody
} from 'react-weui';
const { Confirm } = Dialog;
import Page from '../../component/page';
import {Tool,Alert} from '../../tool.js';
import './index.less';

class MsgDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showConfirm: false,
            accountsType:'',
            comePackage:'',
            confirm: {
                title: '亲爱的~确定要退出吗？',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideConfirm.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '确定退出',
                        onClick: this.Quit.bind(this)
                    }
                ]
            }
        };

        this.showConfirm = this.showConfirm.bind(this);
    }
    componentWillMount(){ 
        // render之前执行的操作
        let sessionid;
        let _this = this;
        if(typeof(Tool.SessionId) == 'string'){
            sessionid= Tool.SessionId;
        }else{
            sessionid = Tool.SessionId.get();
        }
        Tool.get('User/GetAccountDetail.aspx',{'sessionid':sessionid},
            (res) => {
                if(res.status){
                    _this.setState({
                        accountsType:res.data.saasusertypename,
                        comePackage:res.data.canrobcluestotal                
                    })
                }
            },
            (err) => {
                Alert.to('加油包信息加载失败');               
            }
        )

    }
    componentDidMount() {
        // document.title = '账号管理';
        // var body = document.getElementsByTagName('body')[0];
        // var iframe = document.createElement("iframe");
        // iframe.style.display="none";
        // iframe.setAttribute("src", "//m.360che.com/favicon.ico");
        // var d = function() {
        //   setTimeout(function() {
        //     iframe.removeEventListener('load', d);
        //     document.body.removeChild(iframe);
        //   }, 0);
        // };
        // iframe.addEventListener('load', d);
        // document.body.appendChild(iframe);
    }
    showConfirm() {
        this.setState({showConfirm: true});
    }

    hideConfirm() {
        this.setState({showConfirm: false});
    }
    Quit(){
        let json={};
        if(typeof(Tool.SessionId) == 'string'){
            json.sessionid = Tool.SessionId;
        }else{
            json.sessionid = Tool.SessionId.get();
        }
        Tool.get('WeiXin/Unbind.aspx',json,
            (res) => {
                if(res.status == 1){
                    Tool.localItem('vipLodData',null);
                    this.context.router.push({pathname: '/loading'});
                    //WeixinJSBridge.call('closeWindow');
                    //() => {wx.closeWindow();}
                }else if(res.status == 901){
                    alert(res.msg);
                    this.context.router.push({pathname: '/loading'});
                }else{
                    Alert.to(res.msg);
                }
            },
            (err) => {
                Alert.to('请求超时，稍后重试。。');
            }
        )
    }
    componentWillUnmount(){
        clearTimeout(AlertTimeOut);
        for(let i=0;i<XHRLIST.length;i++){
            XHRLIST[i].abort();
        }
        XHRLIST = [];
    }
    render() {
        let oldData = JSON.parse(Tool.localItem('vipLodData'));
        const {realname,tel,dealername,ishavingpwd} = oldData;
        return (
            <Page className="account">
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>用户姓名</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="用户姓名" disabled={true} value={realname}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>所属公司</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="所属公司" disabled={true} value={dealername}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>登录账号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="登录账号" disabled={true} value={tel}/>
                        </CellBody>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>帐号类别</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="" disabled={true} value={this.state.accountsType}/>
                        </CellBody>
                        <CellFooter onClick={(e) => {this.context.router.push({pathname: '/accountType'})}}>
                            <em className="findIcos account-type-icon"></em>
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>加油包剩余</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="" disabled={true} value={this.state.comePackage}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Cells style={{'display':ishavingpwd=='0'?'none':''}} access>
                    <Cell href="#mdfPwd">
                        <CellBody>
                            修改密码
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>
                <Cells style={{'display':ishavingpwd=='1'?'none':''}} access>
                    <Cell href="#addPwd">
                        <CellBody>
                            设置密码
                        </CellBody>
                        <CellFooter />
                    </Cell>
                </Cells>
                <ButtonArea>
                    <Button onClick={this.showConfirm}>退出登录</Button>
                </ButtonArea>
                <Confirm title={this.state.confirm.title} buttons={this.state.confirm.buttons} show={this.state.showConfirm}>
                </Confirm>
            </Page>
        );
    }
};

MsgDemo.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MsgDemo 
