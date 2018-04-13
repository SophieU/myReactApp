function initialFont(){
    var width = document.documentElement.clientWidth;
    var fontSize = (width/10);
    fontSize = fontSize>75?75+'px':fontSize+'px';
    document.documentElement.style.fontSize=fontSize;
    window.onresize=initialFont;
}
initialFont();