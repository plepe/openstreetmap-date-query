# openstreetmap-date-query
Builds a regexp from a date query, e.g. for usage with Overpass API.

This can be used to search for date in the format of the [start_date](https://wiki.openstreetmap.org/wiki/Key%3Astart_date) tag.

### Examples
```js
const osmDateQuery = require('openstreetmap-date-query')

osmDateQuery('2019')
// ^(((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?|(|late )2010s|(|early )C21)|(((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?|(|late )2010s|(|early )C21)(|\\.\\..*))|((|.*\\.\\.)((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?|(|late )2010s|(|early )C21)))$

osmDateQuery('2019', { strict: true })
// '^(~?((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?)|(~?((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?)\\.\\.~?((|early |mid |late )2019(-[0-9]{2}(-[0-9]{2})?)?)))$'

osmDateQuery('2019', { op: '<', strict: true })
// ^(|.*\\.\\.)(.* BC|(|early |mid |late )C0?[0-9]|(|early |mid |late )C[1][0-9]|(|early |mid |late )0?[0-9][0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)|(|early |mid |late )[1][0-9][0-9](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)|(|early |mid |late )C20|(|early |mid |late )20[0](0s|[0-9](-[0-9]{2}(-[0-9]{2})?)?)|(early |mid )2010s|(|early |mid |late )201[012345678](-[0-9]{2}(-[0-9]{2})?)?)$

// build a regexp object from a query
let regexp = new RegExp(osmDateQuery('2019', { op: '<', strict: true }))
// test query (use !! in front to ignore regexp details)
!!'2018-12-24'.match(regexp)
// true

!!'C21'.match(regexp)
// false - the 21st century is not before 2019

let regexp = new RegExp(osmDateQuery('2019', { op: '<', strict: false }))
!!'C21'.match(regexp)
// true - something which happend in the 21st century might have happened before 2019.
```

### Support
The following parts of the start_date specification are supported:
* year only (e.g. `2019`)
* year-month (e.g. `2019-09`)
* year-month-day (e.g. `2019-09-22`)
* decade (e.g. `2010s`)
* century (e.g. `C21`)
* early, mid, late prefix (e.g. `early C21`, `late 2019`)
* ranges (e.g. `C17..1801-01-01`)
* BC or BCE suffix (e.g. `350 BC`)
* circa (e.g. `~2000`) - will be handled like exact value

The following parts of the start_date specification are not supported (yet):
* before, after
* Julian calendar, Julian day system, other calendars
* AD suffix

The following date formats are supported as input to osmDateQuery():
* year only (e.g. `2019`)
* year-month (e.g. `2019-09`)
* year-month-day (e.g. `2019-09-22`)
* decade (e.g. `2010s`)
* century (e.g. `C21`)

The following date formats are not (yet?) supported as input to osmDateQuery():
* early, mid, late prefix (e.g. `early C21`, `late 2019`)
* ranges (e.g. `C17..1801-01-01`)
* ~
* Julian calendar, Julian day system, other calendars
* ranges (e.g. `C17..2019`)
* BC, BCE, AD suffixes (means: only dates AD can be used as input)

### Strict mode
Strict mode will only match dates, which are definitely included in the query. Example: take a building which was built in "C17" (17th century). You query for buildings built in "1623". The building might have been built in that particular year, so it will be matched by when strict mode is `false`. When strict mode is `true`, only dates in the year of 1623 will match (e.g. 1623-02).

Examples:

| Date value | Query | Operator |Matches strict mode|Matches non-strict mode|
|------------|-------|:--------:|:-----------------:|:---------------------:|
| 1623       | C17   | =        | true              | true                  |
| C17        | 1623  | =        | false             | true                  |
| 1623       | C17   | <=       | true              | true                  |
| C17        | 1623  | <=       | false             | true                  |
| 1623       | C17   | <        | false             | false                 |
| C17        | 1623  | <        | false             | true                  |

## Installation
```sh
npm install --save openstreetmap-date-query
```

### Development
Clone the repository and install development dependencies:
```sh
https://github.com/plepe/openstreetmap-date-query.git
cd openstreetmap-date-query
npm install
npm run test

node
> const osmDateQuery = require('./src/query')
> osmDateQuery('2019')
// regexp garbage
```

## Related modules
* [openstreetmap-date-parser](https://github.com/plepe/openstreetmap-date-parser): parse a date string and return a minimum and maximum date.
* [openstreetmap-date-format](https://github.com/plepe/openstreetmap-date-format): format a date string into a human readable string (several languages available)

## API
### osmDateQuery(dateString, options)
Convert a date string to a regular expression

#### Parameters:
*dateString*: a date string to query for

*options*: additional options

Option | Default | Description
-------|---------|--------------
op     | `=`     | Operator. Possible values: `=`, `<`, `<=`, `>`, `>=`
strict | false   | If false, include matches which overlap the date specification.
