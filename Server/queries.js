// Connecting our database using a pool called pgBouncer - lightweight connection pooler
// We use pg module to connect with PostgreSQL Database

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ClinicDB',
  password: 'Letsdoit!',
  port: 5432,
})

// USERS

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { name, contact_number, email, password } = request.body
  
    pool.query('INSERT INTO users (name, contact_number, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [name, contact_number, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, contact_number, email, password } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, contact_number = $2, email = $3, password = $4 WHERE id = $5',
      [name, contact_number, email, password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

// APPOINTMENTS

const getAppointments = (request, response) => {
    pool.query('SELECT * FROM appointments ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAppointmentById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM appointments WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createAppointment = (request, response) => {
    const {patient_id, doctor_id, appointment_date, appointment_time, notes, status } = request.body
  
    pool.query('INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, notes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [patient_id, doctor_id, appointment_date, appointment_time, notes, status], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Apppointment added with ID: ${results.rows[0].id}`)
    })
  }

  const updateAppointment= (request, response) => {
    const id = parseInt(request.params.id)
    const { patient_id, doctor_id, appointment_date, appointment_time, notes, status } = request.body
  
    pool.query(
      'UPDATE appointments SET  appointment_date = $1, appointment_time = $2, notes = $3, status = $4, WHERE id = $5',
      [patient_id, doctor_id, appointment_date, appointment_time, notes, status, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Appointment modified with ID: ${id}`)
      }
    )
  }

  const deleteAppointments = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM appointments WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Appointment deleted with ID: ${id}`)
    })
  }

  // PATIENTS

  const getPatients = (request, response) => {
    pool.query('SELECT * FROM patients ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const loginPatient = (request, response) => {
    const {email, password } = request.body

    pool.query('SELECT * FROM patients WHERE email = $1, password = $2', [email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  const getPatientsById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM patients WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createPatients = (request, response) => {
    const { name, contact_number, email, date_of_birth, address, medical_history, notes } = request.body
  
    pool.query('INSERT INTO patients (name, contact_number, email, date_of_birth, address, medical_history, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [name, contact_number, email, date_of_birth, address, medical_history, notes], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Patient added with ID: ${results.rows[0].id}`)
    })
  }

  const updatePatients= (request, response) => {
    const id = parseInt(request.params.id)
    const { name, contact_number, email, date_of_birth, address, medical_history, notes } = request.body
  
    pool.query(
      'UPDATE patients SET name = $1, contact_number = $2, email = $3, date_of_birth = $4, address = $5, medical_history = $6, notes = $7 WHERE id = $8',
      [name, contact_number, email, date_of_birth, address, medical_history, notes, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Patient modified with ID: ${id}`)
      }
    )
  }

  const deletePatients = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM patients WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Patient deleted with ID: ${id}`)
    })
  }

  // DOCTORS

  const getDoctors = (request, response) => {
    pool.query('SELECT * FROM doctors ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getDoctorsById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM doctors WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createDoctors = (request, response) => {
    const { name, specialty, contact_number, email, other_details } = request.body
  
    pool.query('INSERT INTO doctors (name, specialty, contact_number, email, other_details) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, specialty, contact_number, email, other_details], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Doctor added with ID: ${results.rows[0].id}`)
    })
  }

  const updateDoctors= (request, response) => {
    const id = parseInt(request.params.id)
    const { name, specialty, contact_number, email, other_details } = request.body
  
    pool.query(
      'UPDATE doctors SET  name = $1, specialty = $2, contact_number = $3, email = $4, other_details = $5 WHERE id = $6',
      [name, specialty, contact_number, email, other_details, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Doctor modified with ID: ${id}`)
      }
    )
  }

  const deleteDoctors = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM doctors WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Doctor deleted with ID: ${id}`)
    })
  }

  // Exporting CRUD Functions so that we use them on index.js file

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointments,
    getPatients,
    getPatientsById,
    createPatients,
    loginPatient,
    updatePatients,
    deletePatients, 
    getDoctors,
    getDoctorsById,
    createDoctors,
    updateDoctors,
    deleteDoctors
  }





