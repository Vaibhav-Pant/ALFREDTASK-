import connectDB from "./db/connectDB.js"
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({
    path: "./env"
})

connectDB()
.then( () => {
    app.listen(process.env.PORT || 5000,  () => {
        console.log(`Server is running at PORT: ${process.env.PORT}`);
    })
})
.catch( (err) => {
    console.log(`DB connection failed with error: ${err}`)
})