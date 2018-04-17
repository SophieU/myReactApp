import React from 'react';
import {Icon,Popover} from 'antd-mobile';


const loadPopoverImg=(imgSrc)=>{
    return <img className="am-icon am-icon-xs" src={imgSrc}/>
}

const FamilySel=(props)=>{
    const Item = Popover.Item;
    return (
        <Popover mask
             className="popover"
             visible={props.visible}
             overlay={[
                 (<Item  key="4" value="奶奶" icon={loadPopoverImg('http://p3cnmw3ss.bkt.clouddn.com/defaultAvatar.png')}>奶奶</Item>),
                 (<Item key="5" value="爷爷"  icon={loadPopoverImg('http://p3cnmw3ss.bkt.clouddn.com/defaultAvatar.png')}>爷爷</Item>),
             ]}
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
const Energy = (props)=>{
    return (<div className="energy-box">
        <div className="energy-bar">
            <div style={{width:props.energy+'%'}} className="energy-bar-line"></div>
        </div>
        <span className="energy-title">{props.energy}%</span>
    </div>)
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
        return (
            <div className="device-status insetShadow">
                <FamilySel value={this.props.role} visible={this.state.showPop} onSelect={(opt)=>this.onSelect(opt)}/>
                <img className="avatar" src="http://p3cnmw3ss.bkt.clouddn.com/defaultAvatar.png"/>
                <Energy energy={this.props.electricity}/>
                <p className="status-text">状态/{this.props.status}</p>
            </div>)
    }
}

export default DevStatu;