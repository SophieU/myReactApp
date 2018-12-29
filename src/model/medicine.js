export function encodeAlert(time,open,repeat){
    let formatStr = time+'-';
   let openCode= open?1:0;
   formatStr+=openCode;
   switch (repeat[0]){
       case '一次':
           formatStr=formatStr+'-'+1;
           break;
       case '每天':
           formatStr=formatStr+'-'+2;
           break;
       default:
           let weekArr = ['周日','周一','周二','周三','周四','周五','周六'];
           let arr=[0,0,0,0,0,0,0];
           weekArr.forEach((item,index)=>{
               for(let i=0;i<repeat.length;i++){
                   if(item===repeat[i]){
                       arr[index]=1;

                   }
               }
           });
           arr=arr.join('');
           // formatStr=formatStr+'-'+'3'+'-'+arr;
           formatStr=`${formatStr}-3-${arr}`;
   }
   return formatStr;

}
export function decodeAlert(alertStr){
    let alerts = alertStr.split(',');
    let alarms = [];
    alerts.forEach(alarm=>{
        let temp = {};
        temp.time=alarm.substr(0,alarm.indexOf('-'));
        alarm=alarm.substr(alarm.indexOf('-')+1);
        temp.checked=alarm.substr(0,alarm.indexOf('-'))==='0'?false:true;
        alarm=alarm.substr(alarm.indexOf('-')+1);
        let sequence = alarm.substr(0,1);
        switch (sequence){
            case '1':
                temp.sequence=['一次'];
                break;
            case '2':
                temp.sequence=['每天'];
                break;
            case '3':
                alarm=alarm.substr(alarm.indexOf('-')+1);
                let alarmArr=alarm.split('');
                let cusDay = [];
                alarmArr.forEach((item,index)=>{
                    let weekends = ['周日','周一','周二','周三','周四','周五','周六'];
                    if(item==='1'){
                        cusDay.push(weekends[index]);
                    }
                });
                temp.sequence=cusDay;
                break;
            default:
                temp.sequence=['一次'];

        }
        alarms.push(temp)
    })
    return alarms;
}