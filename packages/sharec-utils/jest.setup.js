jest.mock('./lib/std', () => {
  const stdUtils = jest.requireActual('./lib/std')
  const fs = require('memfs').promises

  stdUtils.fs = {
    readdir: fs.readdir,
    makedir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    removeFile: fs.unlink,
  }

  return stdUtils
})
