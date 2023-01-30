import mongoose from 'mongoose'

const StockSchema = new mongoose.Schema({
    name: String,
    date: String,
    price: Number
});

export const Stock = mongoose.model('Stock', StockSchema); //Collection
