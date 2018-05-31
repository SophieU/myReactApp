import {connect} from 'react-redux';
import GeoLocation from '../pages/location/geo-location';
import * as actions from '../redux/actions';

//映射props
const mapStateToProps=(state)=>{
    return ({
        refreshMap:state.refreshLocation
    })
};
const mapDispatchToProps=(dispatch)=>{
    return({
        refreshLocation:(status)=>dispatch(actions.refreshMap(status))
    })
}
export default connect(mapStateToProps,mapDispatchToProps,null)(GeoLocation)