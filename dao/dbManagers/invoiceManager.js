import invoiceModel from '../models/invoiceModel.js';

export default class InvoiceManager {
  createinvoice = async (code, date, amount, purchaser) => {
    const invoice = await invoiceModel.create({
      code: code,
      purchase_datetime: date,
      amount: amount,
      purchaser: purchaser,
    });
    return invoice;
  };
}