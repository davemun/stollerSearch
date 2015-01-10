var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventorySchema = mongoose.Schema({
  ITEMNMBR1: String,
  ITEMDESC1: String,
  USCATVLS11: String,
  EQUOMQTY1: String,
  QOO1: String,
  WH11: String,
  WH21: String,
  FF1: String,
  WH31: String,
  BOT1: String,
  CaseBot1: String
});

module.exports = mongoose.model('InventoryItem', InventorySchema)