# Starting development app
`npm run dev`

# Starting debug development app
`npm run debug`

## With arguments
`npm run debug -- --migrate=drop`

# Running tests
`npm test`

# Running single test
`jasmine-node test/user/create.spec.js`

# In /billonMeServerTyped installing typescript definitions only
`npm i @types/module-name -S`

# In /billonMeServerTyped/dist other installations
`npm i module-name -S`

# Responses, Status codes
badRequest (400) - Incorrect syntax
POST - created (201) - Something added to database
GET/PUT - ok (200) - Something updated in database
forbidden (403) - Something protected
notFound (404) - Something doesn't exists
serverError (500) - Unhandled Error
(501) - Not Implemented

# Windows MongoDB
`net start MongoDB`

# Ubuntu MongoDB
service mongod start
