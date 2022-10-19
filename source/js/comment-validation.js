import { keyEscape } from './upload-file.js'

const formUploadText = document.querySelector('.img-upload__text');
const hashtags = formUploadText.querySelector('.text__hashtags');
const description = formUploadText.querySelector('.text__description');
const MAXLENGTHHASHTAGS = 20;
const MAXLENGTHDESCRIPTION = 140;

description.addEventListener('input', () => {
  if (description.value.length > MAXLENGTHDESCRIPTION) {
    description.setCustomValidity('Вы превысили максимальное количество симовлов. Максимум 140')
  }
  else {
    description.setCustomValidity('');

  }
  description.reportValidity();

});

description.addEventListener('focus', () => {
  document.removeEventListener('keydown', keyEscape)
});
description.addEventListener('blur', () => {
  document.addEventListener('keydown', keyEscape)
});

hashtags.addEventListener('input', () => {
  const hashtagsLength = hashtags.value.length;
  const lastSybmol = hashtags.value[hashtagsLength - 1];

  if (hashtagsLength == 0) {
    hashtags.setCustomValidity('');
    hashtags.style.borderColor = 'none';
  }

  else if (hashtags.value[0] != '#') {
    hashtags.setCustomValidity('Хэш-тег начинается с #');
    hashtags.style.borderColor = 'red';
  }

  else if (hashtags.value[hashtagsLength - 1] == ' ' && hashtags.value[hashtagsLength - 2] == '#') {
    hashtags.setCustomValidity('Слишком короткий хэш-тег, должен быть хотя бы 1 символ');
    hashtags.style.borderColor = 'red';
  }

  else if (!/[a-zа-я0-9#\s]/iu.test(lastSybmol)) {
    hashtags.setCustomValidity('Вы ввели некорректный символ.');
    hashtags.style.borderColor = 'red';

  }

  else if (!/^#[a-zа-я0-9]{1,19}\s?(#[a-z0-9]{1,19}\s?){0,4}$/giu.test(hashtags.value)) {
    if (hashtags.value[hashtagsLength - 1] == '#' && hashtags.value[hashtagsLength - 2] != ' ') {
      if (hashtagsLength == 1) {
        hashtags.setCustomValidity('Минимальная длина хэш-тега: 2 символа');
        hashtags.style.borderColor = 'red';
      }

      else {
        hashtags.setCustomValidity('Хэш-теги разделяются пробелами')
        hashtags.style.borderColor = 'red';
      }
    }

    else {
      hashtags.setCustomValidity('Хэш-тег начинается с #.Максимальное количество хэш-тегов: 5. Максималная длина хэш-тега: 20 символов.');
      hashtags.style.borderColor = 'red';
    }
  }

  else {
    hashtags.style.borderColor = 'black';
    hashtags.setCustomValidity('');
  }
  hashtags.reportValidity();
});

hashtags.addEventListener('focus', () => {
  document.removeEventListener('keydown', keyEscape)
});
hashtags.addEventListener('blur', () => {
  document.addEventListener('keydown', keyEscape)
});

export { hashtags, description };
