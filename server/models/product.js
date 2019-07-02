//Packages Imports
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // trim: true,
            // required: true,
            // maxlength: 32
        },
           image: {
            type: String,
            // trim: true,
            // required: true,
            // maxlength: 150
        },
        description: {
            type: String,
            // trim: true,
            // required: true,
            // maxlength: 2000
        },
        price: {
            type: String,
            // trim: true,
            // required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            trim: true,
            type: Number,
            default: 0,
            required: true
        },
        sold: {
            type: Number,
            default: 0
        },
<<<<<<< HEAD
        url : {
            type: String,
        },
        size: {
            type: String,
        },
        allPrices: [{}]
        // shipping: {
        //     required: true,
        //     default: true,
        //     type: Boolean
        // }
=======
>>>>>>> 7b94490353f868aeb5d7b5663b213c5ff14ebe51
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
