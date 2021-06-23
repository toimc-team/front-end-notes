const path = require('path')
const fs = require('fs')

exports.genSidebarConfig = (dir, { hasSub, exclude }) => {
  const p = path.join(__dirname, '../../', dir)
  const files = fs.readdirSync(p)
  const subDir = hasSub ? dir.split('/')[1] : ''
  const arr = []
  files.forEach(item => {
    if (exclude.indexOf(item) !== -1) return
    item = subDir
      ? subDir + '/' + path.basename(item, '.md')
      : path.basename(item, '.md')
    arr.push(item)
  })
  subDir ? arr.unshift(subDir + '/') : arr.unshift('')
  return arr
}

exports.resolve = src => path.join(__dirname, '../../../', src)
