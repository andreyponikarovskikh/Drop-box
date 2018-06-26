window.URL = window.URL || window.webkitURL;

var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");



var filesGallery = document.getElementById('fileList');
    // filesGallery.addEventListener('dragstart',handleGalleryDragStart, false);
    // filesGallery.addEventListener('dragend',handleGalleryDragEnd, false);

fileSelect.addEventListener("click", function (evt) {
  if (fileElem) {
    fileElem.click();
  }
  evt.preventDefault(); // prevent navigation to "#"
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
      list.appendChild(li);
      
      var img = document.createElement("img");
      img.src = window.URL.createObjectURL(files[i]);
      img.height = 60;

      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);

    }
}

var dragSrcEl = null;

function handleGalleryDragStart(evt) {
  // Target (this) element is the source node.

  this.style.opacity = '0.4';

  dragSrcEl = this;

  evt.dataTransfer.effectAllowed = 'move';
  // evt.dataTransfer.setData('text/html', this.innerHTML);
}

function handleGalleryDragEnd(evt) {
  this.style.opacity = '1';
  dragSrcEl = this;
}

function handleDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

function handleDragFiles (evt){
   evt.preventDefault();
  var files = evt.dataTransfer.files; // FileList object.
  var list = document.querySelector("ul");
      // fileList.appendChild(list);
      for (var i = 0; i < files.length; i++) {
        var li = document.createElement("li");
        li.className = "filesGallery__item";
        list.appendChild(li);
        
        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(files[i]);
        img.height = 60;

        img.onload = function() {
          window.URL.revokeObjectURL(this.src);
        }
        li.appendChild(img);
    }

}

var dropZone = document.getElementById('dropZone');
    // dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('dragend', handleDragFiles, false);

//-------------make progress bar----------------
var reader;
var progress = document.querySelector('.percent');
function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.loaded) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }




