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
    },
    getLocation(){
        let lnglat = window.localStorage.getItem("lnglat");
        return lnglat?JSON.parse(lnglat):[];
    },
    setLocation(lnglat){
        window.localStorage.setItem('lnglat',JSON.stringify(lnglat));
    },
    getHeadImg(){
        return window.localStorage.getItem('headImg');
    },
    setHeadImg(imgName){
        let imgHref = 'http://jk.anxinqiao.com/share/Img/'+imgName;
        window.localStorage.setItem('headImg',imgHref)
    },
    setMedicine(medicineLists){
        window.localStorage.setItem('medicine',medicineLists);
    },
    getMedicine(){
        let medicine = window.localStorage.getItem('medicine');
        return medicine;
    },
    setYsyApi() {
        let invite = window.location.host;
        let baseAPI = '';
        switch (invite) {
            case 'th5.yishengyue.cn':
                baseAPI = 'http://trest.yishengyue.cn'; //测试
                break;
            case 'h5.yishengyue.cn':
                baseAPI = 'https://api.yishengyue.cn'; //正式
                break;
            case 'yanshih5.yishengyue.cn':
                baseAPI = 'http://yanshiwuyeapi.yishengyue.cn'; //演示
                break;
            default:
                baseAPI = 'http://trest.yishengyue.cn';
        }
        window.localStorage.setItem('ysyApi',baseAPI);
    },
    getYsyApi(){
        let url=window.localStorage.getItem('ysyApi')
        return url;
    }

}
export default localStorage;