
class Scenario {
  constructor (script) {
    if (!script || typeof script !== 'object') {
      return false
    }
    this.script = script || []
    this.playingScenario = undefined
    this.scriptCursor = -1
    this.scriptVar = {}

    this.timer = setInterval(function () {
      if (this._leaveCondition()) {
        this.nextScenario()
      }
    }, 500)
  }

  startScenario () {
    this.nextScenario()
  }

  nextScenario () {
    this.gotoScenario(this.scriptCursor + 1)
  }

  gotoScenario (scriptCursor) {
    this._leaveScenario()
    this.scriptCursor = scriptCursor
    this.playingScenario = this.script[scriptCursor]
    this._playScenario()
  }

  _playScenario () {
    this._enterScenario()
  }

  _enterScenario () {
    if (this.scriptCursor < 0) {
      return
    }
    this.playingScenario.afterenter.forEach(val => val())
  }

  _leaveScenario () {
    if (this.scriptCursor < 0) {
      return
    }
    this.playingScenario.beforeleave.forEach(val => val())
  }

  _leaveCondition () {
    if (this.scriptCursor < 0) {
      return false
    }
    if (this.playingScenario.leavingCondition.length === 0) {
      return false
    }
    return this.playingScenario.leavingCondition.every(val => val())
  }
}

function script (target, scenario) {
  return [
    {
      name: 'Game Initializing',
      afterenter: [
        () => { target.init() }
      ]
    },
    {
      name: 'Staffs Standby',
      methods: {
        login: (username, userpasswd) => {
          target.login(username, userpasswd)
        }
      }
    },
    {
      name: 'Teammembers Standby',
      methods: {
        login: (username, userpasswd) => {
          target.login(username, userpasswd)
        }
      },
      beforeleave: [
        () => { target.randomChooseJobs() }
      ]
    },
    {
      name: 'Teammembers go to their group'
    },
    {
      name: 'Teamleaders go to their group and login',
      methods: {
        login: (username, userpasswd) => {
          target.login(username, userpasswd)
        }
      }
    },
    {
      name: 'All Standby',
      methods: {
        login: (username, userpasswd) => {
          target.login(username, userpasswd)
        }
      }
    },
    {
      name: 'Game Start',
      afterenter: [
        () => { target.start() }
      ],
      beforeleave: [
        () => { scenario.scriptVar.day = 1 }
      ]
    },
    {
      name: 'Day' + (() => scenario.scriptVar.day)() + ': Working Time',
      methods: {
        deliver: (props) => {
          target.deliver(props)
        },
        order: (props) => {
          target.order(props)
        },
        getUpdate: (props) => {
          target.getUpdate(props)
        }
      },
      afterenter: [
        () => { target.start() },
        () => { scenario.scriptVar.enterTime = Date.now() }
      ],
      leavingCondition: [
        () => {
          return Date.now() - scenario.scriptVar.enterTime > 3 * 60 * 1000
        }
      ]
    }
  ]
}

exports.script = script
exports.Scenario = Scenario
