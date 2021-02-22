import express from 'express'
//server imports
import patient from './routes/patient.js'
const app = express()
app.use(express.json())

//server variables
const port:number = 8010





app.use('/patient',patient)

app.listen(port,()=>{
	console.info(`Server running on port ${port}`)
})