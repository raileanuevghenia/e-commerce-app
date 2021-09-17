import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        const conn = await mongoose.connect("mongodb://localhost/productsdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`Established a connection to the database`.cyan.underline)
    } catch (error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB