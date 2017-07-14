import _ from 'lodash'
import odm from '../../lib/db/odm'
import constant from '../../lib/constant'
import debug from '../../lib/debug'

export default class News {
  constructor (gameId) {
    if (!gameId) {
      //throw new debug.Exception('gameId and teamId could not be blank.')
    }
    this.gameId = gameId
    this.newsList = []
    
    this.latestNewsIndex = 0
    this.avaliableNewsList = []
    this.demanded = 0
    this.price = 0

    // load(this.gameId, this.teamId)
  }

  load (gameId) {
    if (!gameId) {
      this.gameId = gameId
    }
  }

  _update (day, time) {
    for (; this.latestNewsIndex < this.getNewsList().length; this.latestNewsIndex++) {
      let news = this.getNewsList()[this.latestNewsIndex]
      if (news.day < day || (news.day === day && news.time * 1000 <= time)) {
        this.avaliableNewsList.push(_.cloneDeep(news))
        this.demanded += news.demanded
        this.price = news.price
      } else {
        break
      }
    }
  }

  getNewsList () {
    return this.newsList
  }

  getAvailableNewsList (day, time) {
    this._update(day, time)
    return this.avaliableNewsList
  }

  getDemanded (day, time) {
    this._update(day, time)
    return this.demanded
  }

  getPrice (day, time) {
    this._update(day, time)
    return this.price
  }

  getAvailableNewsList (day, time) {
    this._update()
    return this.avaliableNewsList
  }

  setNews (newsItem, trigger) {
    newsItem = _.cloneDeep(newsItem)
    newsItem.day = parseInt(newsItem.day)
    newsItem.time = parseInt(newsItem.time)
    newsItem.demanded = parseInt(newsItem.demanded)
    newsItem.price = parseInt(newsItem.price)
    
    let newsOdm = new odm.News({
      gameId: this.gameId,
      triggerCollection: trigger && trigger.collection,
      triggerId: trigger && trigger.id,
      product: newsItem.product,
      demanded: newsItem.demanded,
      price: newsItem.price,
      day: newsItem.day,
      time: newsItem.time
    })

    newsOdm.save((function (err, news) {
      if (err) {
        debug.error(err)
        return
      }
      
      let i = 0
      for (; i < this.getNewsList().length; i++) {
        let cur = this.getNewsList()[i]
        if (cur.day > news.day || (cur.day === news.day && cur.time > news.time)) {
          break
        }
      }
      this.getNewsList().splice(i, 0, _.cloneDeep(newsItem))
    }).bind(this))

    return this
  }
}
