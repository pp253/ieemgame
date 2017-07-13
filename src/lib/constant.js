export const UNKNOWN_TIME = -1
export const STORAGE_EMPTY = 0

export const ZERO_DAYTIME = {
  DAY: 0,
  TIME: UNKNOWN_TIME
}

export const ProductItem = (obj) => {
  return {
    day: obj.day || ZERO_DAYTIME.DAY,
    time: obj.time || ZERO_DAYTIME.TIME,
    product: obj.product || PRODUCTS.UNKNOWN,
    amount: obj.amount || 0
  }
}

export const AccountItem = (obj) => {
  return {
    day: obj.day || ZERO_DAYTIME.DAY,
    time: obj.time || ZERO_DAYTIME.TIME,
    balance: obj.balance || 0
  }
}

export const NewsItem = (obj) => {
  return {
    day: obj.day || ZERO_DAYTIME.DAY,
    time: obj.time || 0,
    title: obj.title || '',
    content: obj.content || '',
    picture: obj.picture || '',
    product: obj.product || PRODUCTS.CAR,
    demanded: obj.demanded || 0,
    price: obj.price || 0
  }
}

export const TriggerItem = (obj) => {
  return {
    collection: obj.collection,
    id: obj.id
  }
}

export const GAMES = {
  UNKNOWN: 'UNKNOWN'
}

export const GAME_STAGE = {
  UNKNOWN: 'UNKNOWN',
  // PREPARE STAGE: 開放登記進入遊戲
  PREPARE: 'PREPARE',
  // READY STAGE: 人員不可再變動
  READY: 'READY',
  // START STAGE: 遊戲進行中
  START: 'START',
  // FINAL STAGE: 進行結算
  FINAL: 'FINAL',
  // END STAGE: 遊戲封存，不可再更動，但可以讀取資料
  END: 'END'
}

export const GAME_WORK = {
  UNKNOWN: 'UNKNOWN',
  WORKING: 'WORKING',
  OFF_WORK: 'OFF_WORK'
}

export const READABLE_GAMES = {
  UNKNOWN: '未知遊戲'
}

export const TEAMS = {
  UNKNOWN: 'UNKNOWN',
  STAFF: 'STAFF'
}

export const READABLE_TEAMS = {
  UNKNOWN: '未知組別',
  STAFF: '工作人員'
}

export const PRODUCTS = {
  UNKNOWN: 'UNKNOWN',
  CAR: 'CAR',
  WHEEL: 'WHEEL',
  BODY: 'BODY',
  ENGINE: 'ENGINE',
  WAREHOUSE: 'WAREHOUSE',
  WAGE: 'WAGE',
  TRANSPORT: 'TRANSPORT'
}

export const READABLE_PRODUCTS = {
  UNKNOWN: '未知產品',
  CAR: '車子',
  WHEEL: '輪胎',
  BODY: '車身',
  ENGINE: '引擎',
  WAREHOUSE: '倉庫',
  WAGE: '工人薪水',
  TRANSPORT: '貨車'
}

export const JOBS = {
  UNKNOWN: 'UNKNOWN',
  FACTORY: 'FACTORY',
  WHOLESALER: 'WHOLESALER',
  RETAILER: 'RETAILER'
}

export const STAFF_JOBS = {
  UNKNOWN_STAFF: 'UNKNOWN_STAFF',
  GUERRILLA: 'GUERRILLA',
  KEEPER: 'KEEPER',
  EXCHANGER: 'EXCHANGER',
  TRANSPORTER: 'TRANSPORTER',
  MARKET: 'MARKET',
  CONFIRMER: 'CONFIRMER',
  CONSOLER: 'CONSOLER'
}

export const READABLE_JOBS = {
  UNKNOWN: '未知',
  FACTORY: '工廠',
  WHOLESALER: '批發商',
  RETAILER: '零售商',
  UNKNOWN_STAFF: '未知工作人員',
  KEEPER: '關主',
  EXCHANGER: '交換處',
  TRANSPORTER: '運輸者',
  MARKET: '市場代表者',
  GUERRILLA: '游擊者、工人',
  CONFIRMER: '資料確認者',
  CONSOLER: '後臺控制者'
}

export class TimeType {
  constructor (day, time) {
    this.day = day || ZERO_DAYTIME.DAY
    this.time = time || ZERO_DAYTIME.TIME
  }

  setDay (day) {
    this.day = day
    return this
  }

  setTime (time) {
    this.time = time
    return this
  }

  getDay () {
    return this.day
  }

  getTime () {
    return this.time
  }

  isWorking () {
    return this.time > 0
  }
}

export default {
  UNKNOWN_TIME: UNKNOWN_TIME,
  STORAGE_EMPTY: STORAGE_EMPTY,
  ZERO_DAYTIME: ZERO_DAYTIME,
  GAMES: GAMES,
  GAME_STAGE: GAME_STAGE,
  GAME_WORK: GAME_WORK,
  READABLE_GAMES: READABLE_GAMES,
  TEAMS: TEAMS,
  READABLE_TEAMS: READABLE_TEAMS,
  PRODUCTS: PRODUCTS,
  READABLE_PRODUCTS: READABLE_PRODUCTS,
  JOBS: JOBS,
  STAFF_JOBS: STAFF_JOBS,
  READABLE_JOBS: READABLE_JOBS,
  TimeType: TimeType,
  ProductItem: ProductItem,
  AccountItem: AccountItem,
  NewsItem: NewsItem
}
