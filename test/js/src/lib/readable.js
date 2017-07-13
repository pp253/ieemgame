
function toReadableDays (days) {
  return '第' + days + '天'
}

function toReadableTimes (times) {
  var s = times % 60
  var m = (times - s) / 60
  return s + ':' + (m < 10 ? '0' : '') + m
}

function toReadableDayTime (days, times) {
  return toReadableDays(days) + ' ' + toReadableTimes(times)
}
