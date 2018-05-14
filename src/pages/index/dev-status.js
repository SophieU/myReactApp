import React from 'react';
import {Icon,Popover} from 'antd-mobile';
import defaultAvatar from '../../images/defaultAvatar.png';


const FamilySel=(props)=>{
    const Item = Popover.Item;
    let overlay  = [];
    props.list.forEach((item,index)=>{
        let tpl = (<Item key={index} value={item.equipmentId}>{item.role}</Item>)
        overlay.push(tpl)
    });
    return (
        <Popover mask
             className="popover"
             visible={props.visible}
                 overlay={overlay}
             align={{
                 overflow: { adjustY: 0, adjustX: 0 },
                 offset: [0, 0],
             }}

             onSelect={(opt)=>props.onSelect(opt)}
        >
            <div style={{
                height: '100%',
                padding: '0 15px',
                display: 'flex',
                alignItems: 'center',
                color: '#4A4A4A',
                marginBottom:'12px',
                fontSize:'16px'
            }}
            >
                {props.value}<Icon className="icon-color" size="xs" type="down"/>
            </div>
        </Popover>
    )
}


class DevStatu extends React.Component {
    constructor(props){
        super(props);
        this.onSelect=this.onSelect.bind(this);
        this.state={
            showPop:false,
        }
    }
    onSelect(opt){
        const value = opt.props.value;
        console.log(value)
        this.setState({
            showPop:false,
        });
        this.props.changeRole(value)
    }
    render() {
        console.log(this.props.roleList[0])
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
       let role = overlay[0].role?overlay[0].role:'sophie';
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
                        {role}<Icon className="icon-color" size="xs" type="down"/>
                    </div>
                </Popover>
                <img className="avatar" src={this.props.headImg?this.props.headImg:defaultAvatar}/>
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