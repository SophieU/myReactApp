/*
* 本地持久化对象
* */
let localStorage = {
    getOpenId(){
        let openId = window.localStorage.getItem("openId");
        return openId?openId:"";
    },
    setOpenId(openId){
        window.localStorage.setItem("openId",openId);
    },
    getEquipmentId(){
        let equipmentId = window.localStorage.getItem("equipmentId");
        return equipmentId?equipmentId:"";
    },
    setEquipmentId(id){
        window.localStorage.setItem("equipmentId",id);
    },
    getRepeatAlarm(){
        let repeats = window.localStorage.getItem("repeatAlarm");
        return repeats?JSON.parse(repeats):[];
    },
    setRepeatAlarm(repeat){
        window.localStorage.setItem("repeatAlarm",JSON.stringify(repeat))
    },
    removeRepeatAlarm(){
        window.localStorage.removeItem("repeatAlarm");
    },
    getAlarmLists(){
        let alarms = window.localStorage.getItem('alarmLists');
        return alarms?JSON.parse(alarms):[];
    },
    setAlarmLists(alarms){
        window.localStorage.setItem("alarmLists",JSON.stringify(alarms))
    }
}
export default localStorage;