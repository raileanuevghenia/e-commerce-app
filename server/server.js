import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/mongoose.config.js'
import dressRoutes from './routes/dress.routes.js'
import userRoutes from './routes/user.routes.js'
import orderRoutes from './routes/order.routes.js'
import uploadRoutes from './routes/upload.routes.js'

dotenv.config()

connectDB()

const app = express()


if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running......")
})

app.use('/api/products', dressRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server is runnig on port ${PORT}`.yellow.bold))