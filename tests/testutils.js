var fs = require('fs')
  , spawn = require('child_process').spawn
  , dataDir = __dirname + '/data/'
  , chai = require('chai')
  , sinon = require('sinon')
  , util = require('util')

exports.expect = chai.expect

exports.spy = sinon.spy

exports.dataDir = dataDir

exports.log = util.debug

function filePath(filename){
    return dataDir + '/' + filename
}
exports.filePath = filePath

function system(args, cb){
    var process = spawn.apply(this, args)
    process.on('exit', cb)
}
exports.system = system

function refreshDataDir(done){
    function mkdir(){
        fs.mkdir(dataDir, done)
    }
    fs.stat(dataDir, function(err, stat){
        if (err)
            mkdir()
        else
            system(['rm', ['-fr', dataDir]], function(code){
                mkdir()
            })
    })
}
exports.refreshDataDir = refreshDataDir

function touchFile(file, cb){
    system(['touch', [filePath(file)]], cb)
}
exports.touchFile = touchFile