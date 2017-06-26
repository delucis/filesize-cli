#!/usr/bin/env node
'use strict'
const meow = require('meow')
const filesize = require('@delucis/filesize')

const cli = meow(`
  Usage
    $ filesize <file> [options]

  Options
    --base=<number>           Number base of file size, default is 2
    -b, --bits                Enables bit sizes, default is false
    -e, --exponent=<number>   Specifies the symbol via exponent,
                              e.g. 2 is MB for base 2, default is -1
    -f, --fullform            Enables full form of unit of measure,
                              default is false
    -h, --help                Display this help text
    -o, --output=<array|exponent|object|string>
    -r, --round=<number>      Decimal place, default is 2
    --spacer=<string>         Character between the result and suffix,
                              default is " "
    --standard=<iec|jedec>    Standard unit of measure, can be iec or jedec,
                              default is jedec; can be overruled by base
    -u, --unix                Enables unix style human readable output,
                              e.g ls -lh, default is false
    -v, --version             Print filesize’s version number

  Examples
    Print the size of a local file using the standard options
    $ filesize my-file.txt
  `, {
    alias: {
      b: 'bits',
      e: 'exponent',
      f: 'fullform',
      h: 'help',
      o: 'output',
      r: 'round',
      u: 'unix',
      v: 'version'
    }
  })

if (cli.input.length === 0) {
  cli.showHelp()
  process.exit(0)
}

filesize(cli.input.shift(), cli.flags, function (e, size) {
  if (e) {
    console.error(e.message)
    process.exit(1)
  }
  console.log(size)
  return size
})
