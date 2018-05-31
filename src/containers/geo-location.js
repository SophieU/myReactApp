import {connect} from 'react-redux';
import GeoLocation from '../pages/location/geo-location';

//映射props
const mapStateToProps=(state)=>{
    return ({
        refreshMap:state.refreshLocation
    })
};

export default connect(mapStateToProps,null,null)(GeoLocation)