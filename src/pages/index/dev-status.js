import React from 'react';
import ReactDOM from 'react-dom';
import {Icon,Popover} from 'antd-mobile';
import defaultAvatar from '../../images/defaultAvatar.png';



class DevStatu extends React.Component {
    constructor(props){
        super(props);
        this.onSelect=this.onSelect.bind(this);
        this.state={
            showPop:false,
        }
    }
    onSelect(opt){
        const value = {
            role:opt.props.children,
            equipmentId:opt.props.value
        };
        this.setState({
            showPop:false,
        });

        this.props.changeRole(value)
    }
    //图片不存在的处理
    imgError=()=>{
        let avatar = ReactDOM.findDOMNode(this.refs.avatar);
        avatar.src=defaultAvatar;
    }
    render() {
        const Item = Popover.Item;
        let overlay  = [];
       this.props.roleList.forEach((item,index)=>{
            let tpl = (<Item key={index} value={item.equipmentId}>{item.role}</Item>)
            overlay.push(tpl)
        });
       let popStyle={
           height: '100%',
           padding: '0 15px',
           display: 'flex',
           alignItems: 'center',
           color: '#4A4A4A',
           marginBottom:'12px',
           fontSize:'16px'
       };
        let avatarSrc = 'http://jk.anxinqiao.com/share/Img/'+this.props.headImg
        return (
            <div className="device-status insetShadow">
                <Popover mask
                         className="popover"
                         visible={this.state.showPop}
                         overlay={overlay}
                         align={{
                             overflow: { adjustY: 0, adjustX: 0 },
                             offset: [0, 0],
                         }}
                         onSelect={(opt)=>this.onSelect(opt)}
                >
                    <div style={popStyle}>
                        {this.props.role}<Icon className="icon-color" size="xs" type="down"/>
                    </div>
                </Popover>
                <img alt="" ref="avatar" className="avatar" onError={this.imgError} src={this.props.headImg?avatarSrc:defaultAvatar}/>
                <div className="energy-box">
                    <div className="energy-bar">
                        <div style={{width:this.props.electricity+'%'}} className="energy-bar-line"></div>
                    </div>
                    <span className="energy-title">{this.props.electricity}%</span>
                </div>
                <p className="status-text">状态/{this.props.status}</p>
            </div>)
    }
}

export default DevStatu;