import mongoose from 'mongoose';

const invoiceCollection = 'invoices';

const invoiceSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  purchase_datetime: {
    type: String,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});

const invoiceModel = mongoose.model(invoiceCollection, invoiceSchema);

export default invoiceModel;