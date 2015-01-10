$(function () {
  $("#search").submit( function(event){
    event.preventDefault();

    /* get some values from elements on the page: */
    var $form = $( this ),
        url = $form.attr( 'action' );

    /* Send the data using post */
    var posting = $.post( url, 
      { 
        ITEMNMBR1: $('#ITEMNMBR1').val(),
        ITEMDESC1: $('#ITEMDESC1').val(),
        USCATVLS11: $('#USCATVLS11').val(),
        EQUOMQTY1: $('#EQUOMQTY1').val(),
        QOO1: $('#QOO1').val(),
        WH11: $('#WH11').val(),
        WH21: $('#WH21').val(),
        FF1: $('#FF1').val(),
        WH31: $('#WH31').val(),
        BOT1: $('#BOT1').val(),
        CaseBot1: $('#CaseBot1').val()
      });

    /* Alerts the results */
    posting.done(function( data ) {
      console.log(data);
      //remove all but header
      // $('#results').children().slice(1).remove();
      var mytbl = document.getElementById("results");
      mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;


      data.forEach(function(invItem){
        //construct a new row for each invventory item
        var node = $('<tr></tr>');

        //for every field in each inventory item
        for(field in invItem){
          //construct new column
          var itemField = $('<td></td>');
          //fill new column with item attributes
          itemField.text(invItem[field]);
          //put new column into table row
          node.append(itemField);
        }

        //put row result into the DOM
        $('#results').append(node);
      });

    });
  });
});