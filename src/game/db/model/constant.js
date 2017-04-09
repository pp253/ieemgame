const mongoose = require('mongoose')

exports.Team = Number
exports.Position = {
  team: { type: exports.Team, require: true },
  job: { type: Number, require: true }
}
exports.Time = Date
exports.EndTime = Date
exports.GameId = mongoose.Schema.ObjectId
exports.Product = Number
exports.Quantity = Number
exports.Cost = Number
exports.Money = Number
exports.UnitPrice = Number
exports.Delivered = Number
exports.Cause = String
