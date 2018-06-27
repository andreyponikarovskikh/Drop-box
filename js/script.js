window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (evt) {
  if (fileElem) {
    fileElem.click();
  }
  evt.preventDefault(); 
}, false);

function handleFiles(files) {
    progress.style.width = '0%';
    progress.textContent = '0%';
    reader = new FileReader();
    reader.onprogress = updateProgress(files);
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };

    var list = document.querySelector("ul");
    fileList.appendChild(list);
    for (var i = 0; i < files.length; i++) {
      var li = document.createElement("li");
      li.className = "filesGallery__item";
      //list.appendChild(li);
      list.insertBefore(li,list.firstChild); //вставляю элемент перед остальными
      
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;

      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
    }
}

//-------------make progress bar----------------
var reader;
var progress = document.querySelector('.progressBar__percent');
function updateProgress(evt) {
    if (evt.loaded) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

//---------------make sortable list ------------

$(document).ready(function() { 
  $(".sortable").sortable({
    opacity: 0.6,
  });
});  


