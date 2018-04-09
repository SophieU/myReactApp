import React from 'react';
import watch from './watch.png'
import './choose-dev.scss';
import {Link} from 'react-router-dom';
class ChooseDev extends React.Component{
    render(){
        return(
            <div>
                <Link to={'/index'} className='devItem'>
                    <img src={watch} alt=""/>
                    <div>
                        <p>老人专用手表</p>
                    </div>
                </Link>
            </div>
        )
    }
}
export default ChooseDev;