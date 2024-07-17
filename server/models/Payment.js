const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    cartId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Schema.Types.Number,
        required: true,
    }
}, {timestamps: true});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;