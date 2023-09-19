import productsDao from './dbManagers/productsManager.js';
import usersDao from './dbManagers/usersManager.js';
import cartsDao from './dbManagers/cartsManager.js';
import invoicesDao from './dbManagers/invoiceManager.js';

const MongoProducts = new productsDao();
const MongoUsers = new usersDao();
const MongoCarts = new cartsDao();
const MongoInvoices = new invoicesDao();

export const PRODUCTSDAO = MongoProducts;
export const USERSDAO = MongoUsers;
export const CARTSDAO = MongoCarts;
export const INVOICESDAO = MongoInvoices;