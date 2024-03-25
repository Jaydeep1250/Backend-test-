const mongoose = require('mongoose');


/* userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "test_users",
    }, */



const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});
const brand = mongoose.models.brand || mongoose.model("brands", brandSchema);

// category
const vahicals = new mongoose.Schema({
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands",
    },
    car_name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});
const vahical = mongoose.model("vahicalData", vahicals);

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String
});
const Image = mongoose.model('Image', imageSchema);
/* category_img: {
    type: String,
    require: true
}, */

module.exports = {
    brand,
    vahical,
    Image
};