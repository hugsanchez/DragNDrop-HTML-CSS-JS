document.querySelectorAll('.drop-zone__input').forEach((inputElement) => {
  const dropZoneElement = inputElement.closest('.drop-zone');

  dropZoneElement.addEventListener('click', evt => {
    inputElement.click();
  });

  inputElement.addEventListener('change', (evt) => {
    if(inputElement.files.length){
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener('dragover', (evt) => {
    evt.preventDefault();
    dropZoneElement.classList.add('drop-zone--over');
  });

  ['dragleave', 'dragend'].forEach((type) => {
    dropZoneElement.addEventListener(type, (evt) => {
      dropZoneElement.classList.remove('drop-zone--over');
    });
  });

  dropZoneElement.addEventListener('drop', (evt) => {
    evt.preventDefault();

    if(evt.dataTransfer.files.length){
      inputElement.files = evt.dataTransfer.files;

      updateThumbnail(dropZoneElement, evt.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove('drop-zone--over');
  });
});

function updateThumbnail(dropZoneElement, file){
  let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');

  if(dropZoneElement.querySelector('.drop-zone__prompt')){
    dropZoneElement.querySelector('.drop-zone__prompt').remove();
  }


  if(!thumbnailElement){
    thumbnailElement = document.createElement('div');
    thumbnailElement.classList.add('drop-zone__thumb');
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  if(file.type.startsWith("image/")){
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}