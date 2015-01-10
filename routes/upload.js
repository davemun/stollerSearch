var express = require('express');
var router = express.Router();
var fs = require ('fs');
var xml2js = require ('xml2js');
var mongoose = require('mongoose');
var InventoryItem = require('../db/models/inventoryModel.js')

/* GET upload page. */
router.get('/', function(req, res) {
  res.render('upload', { title: 'Crystal Report Parser - Upload Files' });
});

router.post('/', function(req, res) {
  parser = new xml2js.Parser();
  parser.parseString(req.body.xml, function (err, result) {
        if(err){
         console.log('Error in loading xml.');
        }else{
          console.log('Done reading xml.');
          InventoryItem.remove({}, function(err) { 
             console.log('Old collection cleaned out!') 
          });
        }

        //store in mongoose
        var json = JSON.stringify(result.CrystalReport);
        var jsonObj = JSON.parse(json);
        //jsonObj.Details is array of objects
        //jsonObj.Details[i].Section[0] is the inventory object
        //jsonObj.Details[i].Section[0].Field is the array of ea inventory obj's fields
          //these are common along every obj

        jsonObj.Details.forEach(function(invObj){
          var values = [];

          invObj.Section[0].Field.forEach(function(val){
            values.push(val.FormattedValue[0]);
          });

          //construct new mongoose model from values
          var item = new InventoryItem({
            ITEMNMBR1: values[0],
            ITEMDESC1: values[1],
            USCATVLS11: values[2],
            EQUOMQTY1: values[3],
            QOO1: values[4],
            WH11: values[5],
            WH21: values[6],
            FF1: values[7],
            WH31: values[8],
            BOT1: values[9],
            CaseBot1: values[10]
          });

          //save item into mongoose DB
          item.save(function (err, item) {
            if (err) return console.error(err);
          });
        });
  });
  res.send();
});

module.exports = router;
