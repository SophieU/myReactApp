import {connect} from 'react-redux'
import Medicine from '../pages/medicine/medicine-alarm'
import {hideNavRight} from '../redux/actions'

//映射dispatch到props上
const mapDispatchToProps = (dispatch)=>({
    hideNavRight:(status)=>{
        dispatch(hideNavRight(status));
    }
});

/*注意，参数1始终是mapStateToProps，若没有，要放空占位*/
export default connect(null,mapDispatchToProps)(Medicine)