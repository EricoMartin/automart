
const carImage = document.getElementById('carimage').value;


document.getElementsByClassName('btn2').onclick = function handleFileSelect(evt) {
  const { files } = evt.target; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    const reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        // Render thumbnail.
        const span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
          '" title="', escape(theFile.name), '"/>'].join('');
        document.getElementById('list').insertBefore(span, null);
      };
    }(f));

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
};

//document.getElementById('displayCarItem').addEventListener('change', handleFileSelect, false);
