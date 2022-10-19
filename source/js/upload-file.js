import {sendRequest, SEND_URL} from './server.js'
import {resetFilters} from './photo-editing.js'

const TYPES_FILE = ['png', 'jpeg', 'jpg']

const editFormImage = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const imgUploadPreview = editFormImage.querySelector('.img-upload__preview').querySelector('img')
const closeEditFormImage = editFormImage.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const popupSuccess = document.querySelector('#success').content.querySelector('.success');
const successButton = popupSuccess.querySelector('.success__button')
const popupError = document.querySelector('#error').content.querySelector('.error');
const errorButton = popupError.querySelector('.error__button')
const main = document.querySelector('main')
console.log(imgUploadPreview)


uploadForm.addEventListener('submit', (event) =>{
  event.preventDefault();
  sendRequest(SEND_URL, uploadForm).then(response => {
    popupSuccess.classList.remove('hidden')
    closeModalEditForm();
    showPopup(popupSuccess, successButton);
    document.addEventListener('mousedown', function(e){
      if(e.target.closest('.success__inner') === null){
        popupSuccess.classList.add('hidden');
      }
  });

  }).catch(error =>{
    popupError.classList.remove('hidden')
    closeModalEditForm();
    showPopup(popupError, errorButton);
    document.addEventListener('mousedown', function(e){
      if(e.target.closest('.error__inner') === null){
        popupError.classList.add('hidden');
      }
  });
  })
}
)




const showModalEditForm = () =>{
  editFormImage.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', keyEscape);
};

const closeModalEditForm = () =>{
  editFormImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  resetFilters();

}

//загрузка файла пользователя
uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_FILE.some((it) => {
    return fileName.endsWith(it)
  })

  if (matches){
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
      imgUploadPreview.src = reader.result;
    });
    reader.readAsDataURL(file)

  }

  showModalEditForm();

  closeEditFormImage.addEventListener('click', () => {
    closeModalEditForm();
  });

})


const keyEscape = (event) => {
  if (event.key === 'Escape' || event.key === "ESC") {
    closeModalEditForm();
  }
}



const showPopup = (element, btn) =>{
  main.appendChild(element);
  btn.addEventListener('click', () =>{
    element.classList.add('hidden')
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' || e.key === "ESC")
    element.classList.add('hidden')
    });
}


export {editFormImage, keyEscape};

