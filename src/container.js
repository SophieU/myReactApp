import React from 'react';
import {Route} from 'react-router-dom';
import ChooseDev from './pages/choose-device/choose-device';
import Index from './pages/index/page-index';
import GeoLocation from './pages/location/geo-location';
import MedicineAlarm from './pages/medicine/medicine-alarm';
import AddMedicine from './pages/medicine/add-medicine';
import RepeatAlarm from './pages/medicine/repeat-alarm';
import DeviceAdmin from './pages/device/device-admin';
import RegisterDev from './pages/device/register-device';
import MailBook from './pages/mailbook/mailbook';
import AddMail from './pages/mailbook/add-mail';
import Sleep from './pages/health/sleep';
import Walk from './pages/health/walk';
import HeartBeat from './pages/health/heartbeat';
import Blood from './pages/health/blood';
import Register from './pages/device/register-device'

class Container extends  React.Component{
    render(){
        return(
            <div id="container">
                <Route exact path='/' component={Index}></Route>
                <Route path='/choose-dev' component={ChooseDev}></Route>
                <Route path='/register' component={Register}></Route>
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