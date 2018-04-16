import React from 'react';
import {List,InputItem,Button,WhiteSpace} from 'antd-mobile';
import {createForm} from 'rc-form';
import './mailbook.scss'

class AddMail extends React.Component {
    render() {
        return (
            <div className="add-mail">
                <div className="upload-block">
                    {/*<div className="upload">*/}
                        <input name="image" accept="image/*" className="upload-input" type="file"/>
                    {/*</div>*/}

                </div>
                <List>
                    <InputItem placeholder="请输入昵称"><span className="form-label">昵称</span></InputItem>
                    <InputItem placeholder="请输入电话号码"><span className="form-label">电话号码</span></InputItem>
                </List>
                <WhiteSpace />
                <Button size="" type="primary">保存</Button>
            </div>)
    }
}

export default AddMail;