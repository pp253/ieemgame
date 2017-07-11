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
      msg: `GameId='${gameId}'遊戲不存在`
    })
  },
  IsWorking (gameId) {
    return ResponseErrorJSON({
      id: 30,
      msg: `GameId='${gameId}'遊戲還在工作階段，無法執行NextDay`
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
