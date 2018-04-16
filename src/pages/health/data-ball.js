import React from 'react';

const DataBall = (props)=>(
    <div className="data-ball">
        <div className="data-show-wrapper">
            <div className="data-show">
                <div className={props.now=="睡眠"?'center-data':'hide'} >
                    <h3>32</h3>
                    <p>翻身次数</p>
                </div>
                <div className={props.now=="计步"?'center-data':'hide'}>
                    <h3 className="walk-data">3200步</h3>
                </div>
                <div className={props.now=="血压"?'center-data':'hide'}>
                    <h3 className="walk-data">120/80</h3>
                    <p>开始测量</p>
                </div>
                <div className={props.now=="心率"?'center-data':'hide'}>
                    <h3 className="walk-data">80</h3>
                    <p>开始测量</p>
                </div>

            </div>
        </div>
        <p className="data-time">12月28日</p>
    </div>
)
// class DataBall extends React.Component {
//
//     render() {
//         return (
//             <div className="data-ball">
//                 <div className="data-show-wrapper">
//                     <div className="data-show">
//                         <div className="sleep">
//                             <h3>32</h3>
//                             <p>翻身次数</p>
//                         </div>
//                     </div>
//                 </div>
//                 <p className="data-time">12月28日</p>
//             </div>)
//     }
// }

export default DataBall;