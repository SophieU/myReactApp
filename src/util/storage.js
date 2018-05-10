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
    }
}
export default localStorage;