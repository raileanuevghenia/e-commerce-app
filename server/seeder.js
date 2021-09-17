import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/user.model.js'
import Dress from './models/dress.model.js'
import Order from './models/order.model.js'
import connectDB from './config/mongoose.config.js'

dotenv.config()

connectDB()


const importData = async () => {
    try{
        await Order.deleteMany()
        await Dress.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser}
        })
        await Dress.insertMany(sampleProducts)

        console.log('Data imported!'.green.inverse)
        process.exit()
    } catch (error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Dress.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!'.red.inverse)
        process.exit()
    } catch (error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}