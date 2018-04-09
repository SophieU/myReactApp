function initialFont(){
    const width = document.documentElement.clientWidth;
    let fontSize = width/10;
    fontSize = fontSize>75?75+'px':fontSize+'px';
    document.documentElement.style.fontSize=fontSize;
    window.onresize=initialFont;
}
initialFont();