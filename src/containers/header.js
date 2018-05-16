import {connect} from 'react-redux';
// import {} from '../redux/actions';
import Header from '../components/header/header';

//映射Redux全局的state到组件的props上
// 此处的state对应的是reducer中的函数名
const mapStateToProps = (state,ownProps)=>{
    return ({
        navRightShow:state.hideNavRight,
    });
}

export default connect(mapStateToProps,null,null)(Header)