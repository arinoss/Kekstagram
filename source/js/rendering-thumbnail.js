import _ from 'lodash';
import { getRequest, GET_URL } from './server.js';
import { getRandomIntInclusive } from './util.js';


const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const unsuccessfulUpload = document.querySelector('#unsuccessful-upload').content.querySelector('.unsuccessful-upload');
const unsuccessfulUploadButton = unsuccessfulUpload.querySelector('.unsuccessful-upload__button')
const containerPictures = document.querySelector('.pictures');
const TIME_DEBOUNCE = 500;


//Показ попап error, если данные от сервера не были получены
const unsuccessfulMessage = (element, btn) => {
  document.querySelector('main').appendChild(element);
  btn.addEventListener('click', () => {
    element.classList.add('hidden')
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === "ESC")
      element.classList.add('hidden')
  });
}

//массив для фотографий пользователей. Будет получент от сервера
let dataUserPhotos = [];

//получить данные от сервера, и записать в массив
const getUserPhotosFromServer = () => {
  return getRequest(GET_URL).then(result => {
    dataUserPhotos = result.concat();
    console.log(dataUserPhotos)

  }).catch(error => {
    unsuccessfulMessage(unsuccessfulUpload, unsuccessfulUploadButton)
  })
}

//показать миниатюры пользователей (по умолчанию, 25)
const printUsersPhotos = (array) => {
  array.forEach(element => {
    const picture = templatePicture.cloneNode(true);
    picture.querySelector('.picture__img').src = element.url;
    picture.querySelector('.picture__likes').textContent = element.likes;
    picture.querySelector('.picture__comments').textContent = element.comments.length;
    containerPictures.appendChild(picture);
  })
}

//удаление миниатюр пользователей
const clearPictures = () => {
  const countOfPictures = containerPictures.querySelectorAll('.picture').length;
  for (let i = 0; i < countOfPictures; i++) {
    const picture = containerPictures.querySelector('.picture');
    containerPictures.removeChild(picture)
  }
}

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const socialCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
const currentCount = bigPicture.querySelector('.current-count');

//Отрисовка комментариев к фотографии в попапе Big Picture
const showComments = (flag, index, array) => {
  const countOfComments = array[index].comments.length;
  for (let i = flag; i < countOfComments; i++) {
    if (i >= 5) {
      break;
    }
    else if (bigPicture.querySelectorAll('.social__comment').length === array[index].comments.length) {
      socialCommentsLoader.classList.add('hidden');
      break;
    }
    const cloneSocialComments = socialComment.cloneNode(true);
    cloneSocialComments.classList.add('social__comment--clone');
    const currentCloneComment = socialComments.querySelectorAll('.social__comment--clone').length;
    cloneSocialComments.querySelector('.social__text').textContent = array[index].comments[currentCloneComment + 1].message;
    cloneSocialComments.querySelector('.social__picture').src = array[index].comments[currentCloneComment + 1].avatar;
    socialComments.appendChild(cloneSocialComments);
  }
  currentCount.textContent = socialComments.querySelectorAll('.social__comment').length;
  if (bigPicture.querySelectorAll('.social__comment').length === array[index].comments.length) {
    socialCommentsLoader.classList.add('hidden');
    return;
  }
};

//Открытие фотографии в попапе Big picture
const showPopupBigPicture = (array) => {
  const photoThumbnail = document.querySelectorAll('.picture');
  photoThumbnail.forEach((element, index) => {

    element.addEventListener('click', () => {
      console.log('клилк')
      bigPicture.classList.remove('hidden');
      document.body.classList.add('.modal-open')
      bigPictureImg.querySelector('img').src = array[index].url;
      socialCaption.textContent = array[index].description;
      likesCount.textContent = array[index].likes;
      commentsCount.textContent = array[index].comments.length;
      socialComments.querySelector('.social__text').textContent = array[index].comments[0].message;
      socialComment.querySelector('.social__picture').src = array[index].comments[0].avatar;
      showComments(1, index, array)

      const eventShowComments = () => {
        showComments(0, index, array);
      };

      const closePopupBigPicture = () =>{
         bigPicture.classList.add('hidden');
        document.body.classList.remove('.modal-open')
        socialCommentsLoader.classList.remove('hidden')
        //Удаление склонированных комментариев. В результате остается только 1 комментарий
        const lengthOfCloneComments = socialComments.querySelectorAll('.social__comment--clone').length;
        for (let i = 0; i < lengthOfCloneComments; i++) {
          const deleteComment = socialComments.querySelector('.social__comment--clone');
          socialComments.removeChild(deleteComment);
        }
        socialCommentsLoader.removeEventListener('click', eventShowComments)

      }
//Отрисовка дополнительных комментариев, при нажатии на кнопку "Загрузить еще"
      socialCommentsLoader.addEventListener('click', eventShowComments);
      //Закрытие попапа Big Picture
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === "ESC") {
          closePopupBigPicture();
        }
      });
      closeBigPicture.addEventListener('click', () => {
        closePopupBigPicture();
      })
    })
  });
}

const updatePhotosByFilters = (array) => {
  clearPictures();
  printUsersPhotos(array);
  showPopupBigPicture(array)
}

getUserPhotosFromServer().finally(() => {
  printUsersPhotos(dataUserPhotos)
  showPopupBigPicture(dataUserPhotos)

  const imgFilters = document.querySelector('.img-filters');
  const filterDefault = imgFilters.querySelector('#filter-default'); //обычный
  const filterRandom = imgFilters.querySelector('#filter-random'); //рандом
  const filterDiscussed = imgFilters.querySelector('#filter-discussed'); //обсуждаеммые

  filterDefault.addEventListener('click', () => {
    filterDefault.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active')
    const debounceUpdate = _.debounce(() => updatePhotosByFilters(dataUserPhotos), TIME_DEBOUNCE);
    debounceUpdate()
  })

  filterDiscussed.addEventListener('click', () => {
    filterDiscussed.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active')
    const discussedPhotos = dataUserPhotos.concat();
    discussedPhotos.sort((user1, user2) => user1['likes'] > user2['likes'] ? -1 : 1);
    const debounceUpdate = _.debounce(() => updatePhotosByFilters(discussedPhotos), TIME_DEBOUNCE);
    debounceUpdate()
  });

  filterRandom.addEventListener('click', () => {
    filterRandom.classList.add('img-filters__button--active')
    filterDiscussed.classList.remove('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    const randomPhotos = [];
    const numbers = [];
    while (numbers.length <= 9) {
      const temp = getRandomIntInclusive(0, 24); // 11
      if (!numbers.includes(temp)) {
        numbers.push(temp)
      }
    }
    numbers.forEach((el, ind) => {
      randomPhotos[ind] = dataUserPhotos[el]
    })
    const debounceUpdate = _.debounce(() => updatePhotosByFilters(randomPhotos), TIME_DEBOUNCE);
    debounceUpdate()
  })
})


