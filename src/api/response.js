export const ResponseJSON = (obj) => {
  return Object.assign({
    error: 0
  }, obj)
}

export const ResponseMsg = {

}

export const ResponseSuccessJSON = (obj) => {
  return Object.assign(ResponseJSON({
    success: 1
  }), obj)
}

export const ResponseErrorJSON = (obj) => {
  return Object.assign(ResponseJSON({
    error: 1,
    id: 0,
    msg: '未知錯誤'
  }), obj)
}

export const ResponseErrorMsg = {
  ApiModuleNotExist (moduleName) {
    return ResponseErrorJSON({
      id: 1,
      msg: `ModuleName='${moduleName}'模組不存在`
    })
  },
  ApiMethodNotExist (methodName) {
    return ResponseErrorJSON({
      id: 2,
      msg: `MethodName='${methodName}'方法不存在`
    })
  },
  ApiArgumentValidationError (errMsg) {
    return ResponseErrorJSON({
      id: 3,
      msg: `參數不符合。`,
      more: errMsg
    })
  },
  GameNotExist (gameId) {
    return ResponseErrorJSON({
      id: 22,
      msg: `GameId='${gameId}'遊戲不存在，請重新整理`
    })
  },
  NicknameAlreadyExist (nickname) {
    return ResponseErrorJSON({
      id: 23,
      msg: `名字 '${nickname}' 已經被使用了，請使用其他名字`
    })
  },
  NotRegisted () {
    return ResponseErrorJSON({
      id: 24,
      msg: '此用戶尚未註冊'
    })
  },
  IsWorking (gameId) {
    return ResponseErrorJSON({
      id: 30,
      msg: `GameId='${gameId}'遊戲還在工作階段，無法執行NextDay`
    })
  },
  StorageNotEnough (gameId, teamIndex, job) {
    return ResponseErrorJSON({
      id: 31,
      msg: `GameId='${gameId}'的第${teamIndex}組${job}庫存不足`,
      readableMsg: `第${teamIndex}組${job}庫存不足`
    })
  },
  AccountNotEnough (gameId, teamIndex) {
    return ResponseErrorJSON({
      id: 32,
      msg: `GameId='${gameId}'的第${teamIndex}組帳戶餘額不足`,
      readableMsg: `第${teamIndex}組帳戶餘額不足`
    })
  },
  OrderNotEnough (gameId, teamIndex, job) {
    return ResponseErrorJSON({
      id: 33,
      msg: `此次行動超出GameId='${gameId}'的第${teamIndex}組的${job}收到的訂單`,
      readableMsg: `此次行動超出第${teamIndex}組${job}收到的訂單`
    })
  },
  MarketNotEnough (gameId) {
    return ResponseErrorJSON({
      id: 34,
      msg: `此次行動超出GameId='${gameId}'的市場需求量`,
      readableMsg: `此次行動超出市場需求量`
    })
  }
}

export default {
  ResponseJSON: ResponseJSON,
  ResponseMsg: ResponseMsg,
  ResponseSuccessJSON: ResponseSuccessJSON,
  ResponseErrorJSON: ResponseErrorJSON,
  ResponseErrorMsg: ResponseErrorMsg
}
