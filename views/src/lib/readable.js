const PRODUCTS = {
  999: '未知',
  0: '車子',
  1: '物料A',
  2: '物料B',
  3: '物料C',
  4: '倉庫',
  5: '工人薪水',
  6: '貨車'
}

const JOBS = {
  999: '未知',
  0: '交換處',
  1: '製造商',
  2: '批發商',
  3: '零售商',
  4: '市場',
  5: '隊輔'
}

export toReadableDays = function (days) {
  return '第' + days + '天'
}

export toReadableTimes = function (times) {
  var s = times % 60
  var m = (times - s) / 60
  return s + ':' + (m < 10 ? '0' : '') + m
}

export toReadableGameTime = function (days, times) {
  return toReadableDays(days) + ' ' + toReadableTimes(times)
}

export toReadableTeam = function (team) {
  return '第' + item.buyer.team + '組'
}

export toReadableJob = function (job) {
  return JOBS[item.buyer.job]
}

export toReadablePosition = function (position) {
  return toReadableTeam(position.team) + ' ' + toReadableJob(position.job)
}

export toReadableProduct = function (product) {
  return PRODUCTS[product]
}

export toReadableOrderList = function (list) {
  let readableList = []
  list.forEach(function (item) {
    let it = {
      readableDayTime: toReadableGameTime(item.gameTime),
      readableBuyer: toReadablePosition(item.buyer),
      readableProduct: toReadableProduct(item.product),
      quantity: item.quantity,
      delivered: item.delivered
    }
    readableList.push(it)
  })
  return readableList
}

