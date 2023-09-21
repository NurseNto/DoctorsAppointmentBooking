
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 4000
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// appointments endpoints and methods
app.get('/appointments', db.getAppointments)
app.get('/appointments/:id', db.getAppointmentById)
app.post('/appointments', db.createAppointment)
app.put('/appointments/:id', db.updateAppointment)
app.delete('/appointments/:id', db.deleteAppointments)

// patients endpoints and methods
app.get('/patients', db.getPatients)
app.get('/patients/:id', db.getPatientsById)
app.post('/patient/auth', db.loginPatient)
app.post('/patients', db.createPatients)
app.put('/patients/:id', db.updatePatients)
app.delete('/patients/:id', db.deletePatients)

// docctors endpoints and methods
app.get('/doctors', db.getDoctors)
app.get('/doctors/:id', db.getDoctorsById)
app.post('/doctors', db.createDoctors)
app.put('/doctors/:id', db.updateDoctors)
app.delete('/doctors/:id', db.deleteDoctors)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

