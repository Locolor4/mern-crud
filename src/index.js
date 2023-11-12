import app from './app.js'
import {createDB} from './db.js'

createDB()
app.listen(3000)
console.log(`Server running on port ${3000}`);