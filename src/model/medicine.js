export function encodeAlert(){

}
export function decodeAlert(alertStr){
    console.log(alertStr)
    let alerts = alertStr.split(',');
    let alarms = [];
    alerts.forEach(alarm=>{
        let temp = {};
        temp.time=alarm.substr(0,alarm.indexOf('-'));
        alarm=alarm.substr(alarm.indexOf('-')+1);
        temp.checked=!!alarm.substr(0,alarm.indexOf('-'));
        alarm=alarm.substr(alarm.indexOf('-')+1);
        let sequence = alarm.substr(0,alarm.indexOf('-'));
        switch (sequence){
            case 1:
                temp.sequence='一次';
                break;
            case 2:
                temp.sequence='每天';
                break;
            case 3:
                alarm=alarm.substr(alarm.indexOf('-')+1);
                let dates = alarm.map(item=>{
                    
                })
        }
        console.log(alarm)
        alarms.push(temp)
    })
    console.log(alarms)
}