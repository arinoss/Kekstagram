import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import {editFormImage} from './upload-file.js';
import {hashtags, description} from './comment-validation.js'


const scaleControlSmaller = editFormImage.querySelector('.scale__control--smaller');
const scaleControlValue = editFormImage.querySelector('.scale__control--value');
const scaleControlBigger = editFormImage.querySelector('.scale__control--bigger');
const imgPreview = editFormImage.querySelector('.img-upload__preview').querySelector('img');
let effectLevel = document.querySelector('.effect-level__value') ;
const effectSlider = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia =  document.querySelector('#effect-sepia');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectMarvin = document.querySelector('#effect-marvin');
let color;




//Изменение масштаба изображения
scaleControlSmaller.addEventListener('click', () =>{
  if (!((parseInt(scaleControlValue.value) - 25) < 25)){
    scaleControlValue.value = parseInt(scaleControlValue.value) - 25 + '%';
    imgPreview.style.transform = `scale(${parseInt(scaleControlValue.value)/100})`;
  }
});


scaleControlBigger.addEventListener('click', () =>{
  if (!((parseInt(scaleControlValue.value) + 25) > 100)){
    scaleControlValue.value = parseInt(scaleControlValue.value) + 25 + '%';
    imgPreview.style.transform = `scale(${parseInt(scaleControlValue.value)/100})`;
  }
});


//Отрисовка слайдера из библиотеки noUiSlider
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 25,
  connect: 'lower',
});

//По умолчанию слайдер скрыт, т.к. выбран эффеки "Оригинал"
effectSlider.classList.add('hidden');

//Функция для обновления слайдера, в зависимости от выбранного эффекта
const update = (min, max, step,collor,ed = '') => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
    connect: 'lower',
  });
  effectSlider.noUiSlider.on('update', (_, handle, unencoded) =>{
    effectLevel.value = unencoded[handle];
    console.log(effectLevel.value)
    imgPreview.style.filter = collor +'(' + effectLevel.value + ed + ')';
  })

  effectSlider.classList.remove('hidden');


  //Если выбран оригинал, сбросываются фильтры, и скрывается слайдер
  if (collor == 'none'){
    effectSlider.classList.add('hidden');
    imgPreview.style.filter = '';
  }
  color = collor;
}


//Подписка на события выбранных эффектов
effectChrome.addEventListener('click', () =>{
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--chrome');
  update(0,1,0.1,'grayscale')

})

effectSepia.addEventListener('click', () =>{
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--sepia');
  update(0,1,0.1,'sepia')

})

effectMarvin.addEventListener('click', () =>{
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--marvin');
  update(0,100,1,'invert','%')
})

effectPhobos.addEventListener('click', () =>{
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--phobos');
  update(0,3,0.1,'blur','px')
})

effectHeat.addEventListener('click', () =>{
  imgPreview.className = '';
  imgPreview.classList.add('effects__preview--heat');
  update(1,3,0.1,'brightness')
})

effectNone.addEventListener('click', () =>{
  imgPreview.className = '';
  update(0,1,1,'none');
})

const resetFilters = () =>{
  effectSlider.classList.add('hidden');
  scaleControlValue.value = 100;
  imgPreview.className = '';
  update(0,1,1,'none');
  imgPreview.style.transform = 'scale(1)';
  hashtags.value = '';
  description.value = '';
  effectNone.checked = true;

};





export {resetFilters}



