
export function parseTimeBystring(time, cFormat) {
  // 判断是否有参数传入
  if (arguments.length === 0) {
    return null
  }
  // 转换成 毫秒
  if ((time + '').length === 10) {
    tiem += time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{m}:{s}'
  let date
  // 判断 传入的时间 是否是一个 object类型，是的话直接赋值给 date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(time)
  }

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
