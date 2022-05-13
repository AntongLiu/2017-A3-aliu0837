const config = {
    focustime:25,
    short:5,
    longtime:30,
    longinterval:4,
    init(){
        $("#focustime").val(config.focustime)
        $("#s2").text(config.short)
        $("#s3").text(config.longtime)
        $("#s4").text(config.longinterval)
    }
}

$(function (){
    config.init()
})

function toggleSet(){
    $(".setting").toggle()
}
