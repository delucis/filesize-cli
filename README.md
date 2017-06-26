# @delucis/filesize-cli

[![Build Status](https://travis-ci.org/delucis/filesize-cli.svg?branch=master)](https://travis-ci.org/delucis/filesize-cli)

A minimal utility to print human-friendly file sizes from the command line. Provides an interface for [`@delucis/filesize`][9c3b46d7], which in turn wraps [`filesize`][cae92b29].

  [cae92b29]: https://www.npmjs.com/package/filesize "filesize package on npmjs.com"
  [9c3b46d7]: https://www.npmjs.com/package/@delucis/filesize "@delucis/filesize package on npmjs.com"



## Installation

```sh
# install for global use
npm install -g @delucis/filesize-cli
```



## Usage

```sh
filesize -v           # print version number to the terminal window
filesize -h           # show detailed help in the terminal window
filesize my-file.txt  # print file size using default options
```

### Options

Most [options that can be passed to `filesize`][19e57b62] can be passed via the command line.

  [19e57b62]: https://www.npmjs.com/package/filesize#optional-settings "filesize package documentation on npmjs.com"


option                      | effect
:---------------------------|:---------------------------------------------------------------------------------------------------
`--base=<number>`           | Number base of file size, default is `2`
`-b`, `--bits`              | Enables bit sizes, default is `false`
`-e`, `--exponent=<number>` | Specifies the symbol via exponent, e.g. `2` is `MB` for base 2, default is `-1`
`-f`, `--fullform`          | Enables full form of unit of measure, default is `false`
`-h`, `--help`              | Display detailed help text
`-o`, `--output=<string>`   | Output of function (`array`, `exponent`, `object`, or `string`), default is `string`
`-r`, `--round=<number>`    | Decimal place, default is `2`
`--spacer=<string>`         | Character between the result and its suffix, default is `" "`
`--standard=<string>`       | Standard unit of measure, can be `iec` or `jedec`, default is `jedec`; can be overruled by `--base`
`-u`, `--unix`              | Enables unix style human readable output, e.g `ls -lh`, default is `false`
`-v`, `--version`           | Print filesize’s version number
