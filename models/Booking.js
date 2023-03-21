const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
      
    bookingItems: [
      {
        name: { type: String, required: true },
        
        date:{type: String,
      required: true},
      
      time: {
      type: String,
      required: true,
    },
        price: { type: Number, required: true },
        treatment: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Treatment',
        },
      },
    ],

    
   
  
  
  }
);

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
