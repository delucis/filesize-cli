'use strict'

const EXEC = require('child_process').exec
const CHAI = require('chai')
CHAI.use(require('chai-match'))
const EXPECT = CHAI.expect

// Regular expressions for validating stdout
const numberSpaceUnitFormat = /^[\d.]+ [a-zA-Z]+$/m
const arraylikeString = /^\[ *(((['"][-\w. ]+['"]|[-\w.]+), *)*)(['"][-\w. ]+['"]|[-\w.]+) *]$/m
const objectlikeString = /^{ ?((\w+: ?(['"][^'"]+['"]|[-\w.]+), ?)*)(\w+: ?(['"][^'"]+['"]|[-\w.]+)) ?}$/m
const valueKeyInString = /value: ?(-?[\d]+(\.[\d]+)?)/m
const startsWithNumber = /^-?[\d]+(\.[\d]+)?/
const isANumber = /^-?[\d]+(\.[\d]+)?$/
const startswithENOENT = /^ENOENT.*/

describe('filesize-cli', function () {
  it('should return an error object that is null', function (done) {
    EXEC('./cli.js cli.js', function (e, stdout, stderr) {
      EXPECT(e).to.be.null
      done()
    })
  })

  it('should return a string by default', function (done) {
    EXEC('./cli.js cli.js', function (e, stdout, stderr) {
      EXPECT(stdout).to.be.a('string')
      done()
    })
  })

  it('should return a string with a format of <number><space><unit>', function (done) {
    EXEC('./cli.js cli.js', function (e, stdout, stderr) {
      EXPECT(stdout).to.match(numberSpaceUnitFormat)
      done()
    })
  })

  it('should return an array if requested', function (done) {
    EXEC('./cli.js cli.js -o=array', function (e, stdout, stderr) {
      EXPECT(stdout).to.match(arraylikeString)
      done()
    })
  })

  it('should return an array whose first member is a number', function (done) {
    EXEC('./cli.js cli.js -o=array', function (e, stdout, stderr) {
      EXPECT(stdout).to.match(arraylikeString).and.capture(0).to.match(startsWithNumber)
      done()
    })
  })

  it('should return an object if requested', function (done) {
    EXEC('./cli.js cli.js -o=object', function (e, stdout, stderr) {
      EXPECT(stdout).to.match(objectlikeString)
      done()
    })
  })

  it('should return an object whose "value" property is a number', function (done) {
    EXEC('./cli.js cli.js -o=object', function (e, stdout, stderr) {
      EXPECT(stdout).to.match(objectlikeString)
      EXPECT(stdout).to.match(valueKeyInString).and.capture(0).to.match(isANumber)
      done()
    })
  })

  it('should raise ENOENT error if the passed file does not exist', function (done) {
    EXEC('./cli.js file-that-does-not-exist', function (e, stdout, stderr) {
      EXPECT(stderr).to.match(startswithENOENT)
      done()
    })
  })
})
