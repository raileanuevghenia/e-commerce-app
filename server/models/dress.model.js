import mongoose from 'mongoose'


const ReviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const DressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        
    },
    category: {
        type: String,
        required: [true, "Category is reqiured"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    reviews: [ReviewSchema],
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Dress = mongoose.model('Dress', DressSchema);

export default Dress;