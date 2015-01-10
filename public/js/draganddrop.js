// getElementById
function $id(id) {
  return document.getElementById(id);
}

//
// output information
function Output(msg) {
  var m = $id("messages");
  m.innerHTML = msg + m.innerHTML;
}

// file drag hover
function FileDragHover(e) {
  e.stopPropagation();
  e.preventDefault();
  e.target.className = (e.type == "dragover" ? "hover" : "");
}

function storeJSON() {
  console.log('stored?');
}

function successPost() {
  console.log('posted to server');
}

function ParseFile(file) {

  Output(
    "<p>File information: <strong>" + file.name +
    "</strong> type: <strong>" + file.type +
    "</strong> size: <strong>" + file.size +
    "</strong> bytes</p>"
  );

  // display text
  var fileType = file.name.split('.').pop();
  if (fileType.indexOf("xml") === 0) {
    var reader = new FileReader();
    reader.onload = function(){
      var xmlString = reader.result;
      var data = {xml: xmlString};
      var dataType = "text";
      //send xmlString to server for processing
      $.ajax({
        type: "POST",
        url: '/upload',
        data: data,
        success: successPost,
        dataType: dataType
      });

    };
    reader.readAsText(file);
  }
  
}

// file selection
function FileSelectHandler(e) {

  // cancel event and hover styling
  FileDragHover(e);

  // fetch FileList object
  var files = e.target.files || e.dataTransfer.files;

  // process all File objects
  for (var i = 0, f; f = files[i]; i++) {
    ParseFile(f);
  }

}


//==================File Drag And Drop Functionality====================

//
// initialize
function Init() {

  var fileselect = document.getElementById("fileselect"),
    filedrag = $id("filedrag"),
    submitbutton = $id("submitbutton");

  // file select
  fileselect.addEventListener("change", FileSelectHandler, false);

  // is XHR2 available?
  var xhr = new XMLHttpRequest();
  if (xhr.upload) {
  
    // file drop
    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
    filedrag.style.display = "block";
    
    // remove submit button
    submitbutton.style.display = "none";
  }
}


//==================File Drag And Drop Functionality====================
$(function(){
    if (window.File && window.FileList && window.FileReader) {
      Init();
    }
});