City Fees API
==========

API for the city fees data.

Get Info
------
Retrieve fee information

### Name
`/api/get/name/{name to get}`
Demo: [/api/get/name/Fire%20Alarm%20Permit](http://cityfee.herokuapp.com/api/get/name/Fire%20Alarm%20Permit)

### Fulltext Search
Searches the name and description fields.

**Basic:**
`/api/get/search/{query}`
Demo: [/api/get/search/charts](http://cityfee.herokuapp.com/api/get/search/charts)

**Filter by department:**
`/api/get/search/{query}?ResponsibleDepartment[]=...&ResponsibleDepartment[]=...`
Demo: [/api/get/search/street?ResponsibleDepartment[]=Mayor%20Office&ResponsibleDepartment[]=Finance](http://cityfee.herokuapp.com/api/get/search/street?ResponsibleDepartment[]=Mayor%20Office&ResponsibleDepartment[]=Finance)

### All
`/api/get/all`
Demo: [/api/get/all](http://cityfee.herokuapp.com/api/get/all)

**Better performance (recommended)**
JSONP is supported; send a callback along with a hash of your current fees data. All of the fees will be queried and returned only if the sent hash does not match (which means outdated or corrupt data). The callback will be called with no parameters if the hash matches.
`/api/get/all?hash={md5 hash}&callback={callback}`

Set Info
------
TBI

Notes
------
The raw data (cityfees.json) can be imported into the MongoDB database with `scripts/importData.js`