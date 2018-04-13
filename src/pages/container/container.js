import React from 'react';
import {Route} from 'react-router-dom';
import ChooseDev from '../choose-device/choose-device';
import Index from '../index/page-index';
import GeoLocation from '../location/geo-location';
import MedicineAlarm from '../medicine/medicine-alarm';
import AddMedicine from '../medicine/add-medicine';
import RepeatAlarm from '../medicine/repeat-alarm';
import DeviceAdmin from '../device/device-admin';
import RegisterDev from '../device/register-device';
import MailBook from '../mailbook/mailbook';
import AddMail from '../mailbook/add-mail';
import Sleep from '../health/sleep';
import Walk from '../health/walk';
import HeartBeat from '../health/heartbeat';
import Blood from '../health/blood'

class Container extends  React.Component{
    render(){
        return(
            <div id="container">
                <Route exact path='/' component={ChooseDev}></Route>
                <Route path='/index' component={Index}></Route>
                <Route path='/location' component={GeoLocation}></Route>
                <Route path='/medicine' component={MedicineAlarm}></Route>
                <Route path='/add-medicine' component={AddMedicine}></Route>
                <Route path='/edit-medicine' component={AddMedicine}></Route>
                <Route path='/repeat-alarm' component={RepeatAlarm}></Route>
                <Route path='/device-admin' component={DeviceAdmin}></Route>
                <Route path='/register-dev' component={RegisterDev}></Route>
                <Route path='/add-mail' component={AddMail}></Route>
                <Route path='/mail-book' component={MailBook}></Route>
                <Route path='/sleep' component={Sleep}></Route>
                <Route path='/walk' component={Walk}></Route>
                <Route path='/heartbeat' component={HeartBeat}></Route>
                <Route path='/blood' component={Blood}></Route>
            </div>
        )
    }
}
export default Container