import mongoose, { Schema } from 'mongoose'


const listingSchema = new mongoose.Schema({
creator: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
firstName: {
    type: String,
},
category: {
    type: String,
    required: true
},
type: {
    type: String,
    required: true
},
streetAdress: {
    type: String,
    required: true
},
aptSuite: {
    type: String,
    required: true
},
city: {
    type: String,
    required: true
},
province: {
    type: String,
    required: true
},
country: {
    type: String,
    required: true
},
guestCount: { 
    type: Number,
    required: true
},
bedroomsCount: { 
    type: Number,
    required: true
},

bedCount: { 
    type: Number,
    required: true
},

bathrooms: { 
    type: Number,
    required: true
},
amenities: {
    type: Array,
    default: []
},
listingPhotoPaths: [{type: String}],
title: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
highlight: {
    type: String,
    required: true
},
highlightDesc: {
    type: String,
    required: true
},
price: {
    type: Number,
    required: true
},
listingPhotoPath: [{type: String}]




});



const Listing = mongoose.model('Listing', listingSchema);
export default Listing;