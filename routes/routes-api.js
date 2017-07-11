import response from './src/response'
import module from './src/module/'

export default function routesApi (req, res, next) {
  let moduleName = req.params.module
  let methodName = req.params.method
  let moduleList = module

  if (moduleList[moduleName]) {
    if (moduleList[moduleName][methodName]) {
      moduleList[moduleName][methodName](req, res, next)
    } else {
      res.json(response.ResponseErrorMsg.ApiMethodNotExist(methodName))
    }
  } else {
    res.json(response.ResponseErrorMsg.ApiModuleNotExist(moduleName))
  }
}
