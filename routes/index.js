var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var InventoryItem = require('../db/models/inventoryModel.js')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Stoller Inventory Search' });
});

router.post('/', function(req, res) {
  var result;

  //remove empty fields from request
  //also change each field into partial string search
  for(attr in req.body){
    if(req.body[attr] === ''){
      delete req.body[attr];
    }else{
      req.body[attr] = new RegExp(req.body[attr], "i");
    }
  }


  InventoryItem.find(req.body, function (err, result) {
    if (err) console.log(err);

    //clean out secret attrs in obj before return to client
    for(var i = 0; i < result.length; i++){
      var cleanedObj =       
        { 
          ITEMNMBR1: result[i].ITEMNMBR1,
          ITEMDESC1: result[i].ITEMDESC1,
          USCATVLS11: result[i].USCATVLS11,
          EQUOMQTY1: result[i].EQUOMQTY1,
          QOO1: result[i].QOO1,
          WH11: result[i].WH11,
          WH21: result[i].WH21,
          WH31: result[i].WH31,
          FF1: result[i].FF1,
          BOT1: result[i].BOT1,
          CaseBot1: result[i].CaseBot1,
        };
      //replace old with cleaned
      result[i] = cleanedObj;
    };

    res.send(result);
  })

});

module.exports = router;
