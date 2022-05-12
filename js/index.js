class Base{
  constructor() {
    this.timeEvent = null
    this.timeStr = []
  }
  toggle(index){
    $('.nav').children().eq(index).addClass('ac').siblings().removeClass('ac');
    $('.tab-con').children().eq(index).show().siblings().hide();
  }
  render(el,time){
    $(el).children().eq(0).text(time[0])
    $(el).children().eq(2).text(time[1])
  }
}

class Count extends Base{
  constructor() {
    super()
    this.index = 1
    this.el = '#count'
    this.atom = moment.utc(0)
  }
  init(){
    this.toggle(this.index)
  }
  reset(){
    this.atom = moment.utc(0)
    this.timeStr = ['00','00']
    this.stop()
    this.render(this.el,this.timeStr)
  }
  stop(){
    $(".count.start").show()
    $(".count.stop").hide()
    clearInterval(this.timeEvent)
  }
  start(){
    $(".count.stop").show()
    $(".count.reset").show()
    $(".count.start").hide()
    this.timeEvent = setInterval(()=>{
      this.atom=this.atom.add(1, 's');
      this.timeStr = this.atom.format('mm:ss').split(':')
      this.render(this.el,this.timeStr)
    },100)
  }
}

class Pomodora extends Base{
  constructor() {
    super()
    this.index = 0
    this.el = '#pomodoro'
  }
  init(){
    this.toggle(this.index)
  }
}

const count = new Count()
const pomodora = new Pomodora()
