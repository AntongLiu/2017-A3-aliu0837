function closeAll() {
  $(".fixed").hide()
}

function setReg() {
  closeAll()
  $('.reg').fadeIn()
}

function setLogin() {
  closeAll()
  $('.login').fadeIn()
}

function toggleMusic(e) {
  var audioObj = document.getElementById('audio');
  if (audioObj.paused) {
    $(e).attr("fill", "green")
    audioObj.play();
  } else {
    $(e).attr("fill", "#666")
    audioObj.pause();
  }
}

class Base {
  constructor() {
    this.timeEvent = null
    this.timeStr = []
  }

  toggle(index) {
    $('.nav').children().eq(index).addClass('ac').siblings().removeClass('ac');
    $('.tab-con').children().eq(index).show().siblings().hide();
  }

  render(el, time) {
    $(el).children().eq(0).text(time[0])
    $(el).children().eq(2).text(time[1])
  }
}

class Count extends Base {
  constructor() {
    super()
    this.index = 1
    this.el = '#count'
    this.atom = moment.utc(0)
  }

  init() {
    pomodora.stop()
    this.toggle(this.index)
  }

  reset() {
    $(".count.reset").hide()
    this.atom = moment.utc(0)
    this.timeStr = ['00', '00']
    this.stop()
    this.render(this.el, this.timeStr)
  }

  stop() {
    $(".count.start").show()
    $(".count.stop").hide()
    clearInterval(this.timeEvent)
  }

  start() {
    $(".count.stop").show()
    $(".count.reset").show()
    $(".count.start").hide()
    this.timeEvent = setInterval(() => {
      this.atom = this.atom.add(1, 's');
      this.timeStr = this.atom.format('mm:ss').split(':')
      this.render(this.el, this.timeStr)
    }, 1000)
  }
}

$("#to").click(function () {
  $("#ifa").toggle()
})

class Pomodora extends Base {
  constructor() {
    super()
    this.index = 0
    this.el = '#pomodoro'
    this.atom = moment.utc(config.focustime * 60 * 1000)
    this.focus = 0
    this.break = 0
    this.long = 0
    this.one = true
    this.state = 'focus'
  }

  init() {
    count.stop()
    this.toggle(this.index)
  }

  stop() {
    this.timeStr = this.atom.format('mm:ss').split(':')
    if (this.state==='focus'){
      if (this.timeStr[0] == config.focustime && this.timeStr[1] === '00') {
        console.log(1)
        return false
      }
    }
    if (this.state==='break'){
      if (this.timeStr[0] === '05' && this.timeStr[1] === '00') {
        return false
      }
    }
    if (this.state==='long'){
      if (this.timeStr[0] === '30' && this.timeStr[1] === '00') {
        return false
      }
    }

    switch (this.state) {
      case "focus":
        $(".pomodora.break").hide()
        $(".pomodora.long").hide()
        $(".pomodora.start.init").show()
        $(".pomodora.give.init").show()
        $(".pomodora.stop.init").hide()
        break;
      case "break":
        $(".pomodora.init").hide()
        $(".pomodora.long").hide()
        $(".pomodora.start.break").show()
        $(".pomodora.give.break").show()
        $(".pomodora.stop.break").hide()
        break;
      case "long":
        $(".pomodora.init").hide()
        $(".pomodora.break").hide()
        $(".pomodora.start.long").show()
        $(".pomodora.give.long").show()
        $(".pomodora.stop.long").hide()
        break;
    }

    clearInterval(this.timeEvent)
  }

  initFocus() {
    this.atom = moment.utc(config.focustime * 60 * 1000)
    $(".pomodora.start.init").show()
    $(".pomodora.give.init").hide()
    $(".pomodora.stop.init").hide()
    $(".pomodora.break").hide()
    $(".pomodora.long").hide()

    if (this.timeEvent) {
      clearInterval(this.timeEvent)
    }
    this.timeStr = this.atom.format('mm:ss').split(':')
    this.render(this.el, this.timeStr)
  }

  initBreak() {
    this.atom = moment.utc(5 * 60 * 1000)
    $(".pomodora.start.break").show()
    $(".pomodora.give.break").hide()
    $(".pomodora.stop.break").hide()
    $(".pomodora.init").hide()
    $(".pomodora.long").hide()

    if (this.timeEvent) {
      clearInterval(this.timeEvent)
    }
    this.timeStr = this.atom.format('mm:ss').split(':')
    this.render(this.el, this.timeStr)
  }

  initLong() {
    this.atom = moment.utc(30 * 60 * 1000)
    $(".pomodora.start.long").show()
    $(".pomodora.give.long").hide()
    $(".pomodora.stop.long").hide()
    $(".pomodora.init").hide()
    $(".pomodora.break").hide()

    if (this.timeEvent) {
      clearInterval(this.timeEvent)
    }
    this.timeStr = this.atom.format('mm:ss').split(':')
    this.render(this.el, this.timeStr)
  }

  skipBreak() {
    this.initFocus()
  }

  skipLong() {
    window.location.reload()
  }

  toggleFocus() {
    $(".pomodora.break").hide()
    $(".pomodora.long").hide()
    $(".pomodora.start.init").hide()
    $(".pomodora.give.init").show()
    $(".pomodora.stop.init").show()
  }

  toggleBreak() {
    $(".pomodora.init").hide()
    $(".pomodora.long").hide()
    $(".pomodora.start.break").hide()
    $(".pomodora.give.break").show()
    $(".pomodora.stop.break").show()
  }

  toggleLong() {
    $(".pomodora.init").hide()
    $(".pomodora.break").hide()
    $(".pomodora.start.long").hide()
    $(".pomodora.give.long").show()
    $(".pomodora.stop.long").show()
  }

  give() {
    if (this.focus === 4) {
      this.initLong()
    } else {
      console.log('f')
      this.initBreak()
    }
  }

  cdm() {
    switch (this.state) {
      case "focus":
        if (this.timeStr[0] == config.focustime && this.timeStr[1] === '00') {
          this.focus++
          $(".focus").text(this.focus)
        }
        this.toggleFocus()
        break;
      case "break":
        if (this.timeStr[0] === '05' && this.timeStr[1] === '00') {
          this.break++
          $("#break").text(this.break)
        }
        this.toggleBreak()
        break;
      case "long":
        if (this.timeStr[0] === '30' && this.timeStr[1] === '00') {
          this.long++
          $("#long").text(this.long)
        }
        this.toggleLong()
        break;
    }
  }

  start(state) {
    this.state = state
    this.timeStr = this.atom.format('mm:ss').split(':')
    this.cdm()
    this.one = false
    this.timeEvent = setInterval(() => {
      this.atom = this.atom.subtract(1, 's');
      this.timeStr = this.atom.format('mm:ss').split(':')
      if (this.timeStr[0] === '00' && this.timeStr[1] === '00') {
        clearInterval(this.timeEvent)
        switch (this.state) {
          case "focus":
            if (this.focus === 4) {
              this.initLong()
            } else {
              this.initBreak()
            }
            break;
          case "break":
            this.initFocus()
            break;
          case "long":
            alert('over,please again')
            window.location.reload()
            break;
        }
      }
      this.render(this.el, this.timeStr)
    }, 1000)
  }
}

const count = new Count()
const pomodora = new Pomodora()

function focusChagne(e) {
  if (e.value < 10) {
    e.value = '0' + e.value
  }
  config.focustime = e.value
  pomodora.initFocus()
}
