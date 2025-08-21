import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImagePath: {
        type: String,
        default: ""
  },
  wishList: {
    type: Array,
    default: []
  } ,
   propertyList: {
    type: Array,
    default: []
  },
   reservationList: {
    type: Array,
    default: []
  }
})



const User = mongoose.model('User', userSchema);
export default User;