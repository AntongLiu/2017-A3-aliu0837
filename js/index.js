//Close all pop-ups
function closeAll() {
  $(".fixed").hide()
}

//Display the registration page
function setReg() {
  closeAll()
  $('.reg').fadeIn()
}

//Display the user login page
function setLogin() {
  closeAll()
  $('.login').fadeIn()
}

//Click to play and pause music
function toggleMusic(e) {
  var audioObj = document.getElementById('audio');
  //Determines whether music is played or not based on the play-pause status
  if (audioObj.paused) {
    //Filling colour
    $(e).attr("fill", "green")
    audioObj.play();
  } else {
    $(e).attr("fill", "#666")
    audioObj.pause();
  }
}

//Timer Base Classes
class Base {
  constructor() {
    this.timeEvent = null
    //Timer text storage in the page
    this.timeStr = []
  }

  //Toggle timer
  toggle(index) {
    $('.nav').children().eq(index).addClass('ac').siblings().removeClass('ac');
    $('.tab-con').children().eq(index).show().siblings().hide();
  }

  //Rendering timer figures
  render(el, time) {
    $(el).children().eq(0).text(time[0])
    $(el).children().eq(2).text(time[1])
  }
}

class Count extends Base {
  constructor() {
    super()
    //Set the index to 1
    this.index = 1
    //Set root element
    this.el = '#count'
    //Initial value of the timer
    this.atom = moment.utc(0)
  }

  //Initialization
  init() {
    //Pause other timers
    pomodora.stop()
    //Switch to the corresponding timer
    this.toggle(this.index)
  }

  //Reset Timer
  reset() {
    //Hidden buttons
    $(".count.reset").hide()
    //Set the value of the object to the initialized value
    this.atom = moment.utc(0)
    this.timeStr = ['00', '00']
    this.stop()
    this.render(this.el, this.timeStr)
  }

  //Stop
  stop() {
    $(".count.start").show()
    $(".count.stop").hide()
    //Clear timer
    clearInterval(this.timeEvent)
  }

  //Start
  start() {
    //Hide and show the corresponding buttons
    $(".count.stop").show()
    $(".count.reset").show()
    $(".count.start").hide()
    //Setting the timer
    this.timeEvent = setInterval(() => {
      this.atom = this.atom.add(1, 's');
      //Timing method, increase by 1, in seconds
      this.timeStr = this.atom.format('mm:ss').split(':')
      //Setting time
      this.render(this.el, this.timeStr)//Rendering
    }, 1000)
  }
}

//Toggle to-do list
$("#to").click(function () {
  $("#ifa").toggle()
})

class Pomodora extends Base {
  constructor() {
    super()
    this.index = 0
    this.el = '#pomodoro'
    this.atom = moment.utc(config.focustime * 60 * 1000)
    //Three times
    this.focus = 0
    this.break = 0
    this.long = 0
    this.one = true
    //Current status
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

    //Different buttons are displayed depending on the corresponding status
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

  //Methods of initialising Focus
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

  //Methods of initialising Break
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

  //Methods of initialising Long Break time
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

  //Skip the break
  skipBreak() {
    this.initFocus()
  }

  //Skip the long break
  skipLong() {
    window.location.reload()
  }

  // Button toggle method for focus
  toggleFocus() {
    $(".pomodora.break").hide()
    $(".pomodora.long").hide()
    $(".pomodora.start.init").hide()
    $(".pomodora.give.init").show()
    $(".pomodora.stop.init").show()
  }

  // Button toggle method for Break
  toggleBreak() {
    $(".pomodora.init").hide()
    $(".pomodora.long").hide()
    $(".pomodora.start.break").hide()
    $(".pomodora.give.break").show()
    $(".pomodora.stop.break").show()
  }

  //  Button toggle method for Long break
  toggleLong() {
    $(".pomodora.init").hide()
    $(".pomodora.break").hide()
    $(".pomodora.start.long").hide()
    $(".pomodora.give.long").show()
    $(".pomodora.stop.long").show()
  }

  //If you have completed the four rounds of focused study, go to the long break
  give() {
  give() {
    if (this.focus === 4) {
      this.initLong()
    } else {
      this.initFocus()
    }
  }

    //Increase the number of times depending on the status
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

    //Start method
  start(state) {
    this.state = state
    this.timeStr = this.atom.format('mm:ss').split(':')
    this.cdm()
    this.one = false
    this.timeEvent = setInterval(() => {
      this.atom = this.atom.subtract(1, 's');
      this.timeStr = this.atom.format('mm:ss').split(':')
      //Method of execution when time is reached
      if (this.timeStr[0] === '00' && this.timeStr[1] === '00') {
        clearInterval(this.timeEvent)
        //Method of determining the next round based on status and count
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
    //Set item, if less than 10, make up 0
  }
  if (e.value < 10) {
    e.value = '0' + e.value
  }
  config.focustime = e.value
  pomodora.initFocus()
}
