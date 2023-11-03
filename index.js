import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

import bodyParser from 'body-parser'
const { json } = bodyParser

import userRouter from './src/users/user.router.js'
import libroRouter from './src/libros/libros.router.js'

const app = express()
const PUERTO = process.env.PORT ?? 3002

// Middlewars
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(json())

// Endpoints
app.use('/api/v1/users', userRouter)
app.use('/api/v1/libros', libroRouter)

// Listen
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`)
})