import { getRandomIntInclusive } from './util.js';

//Глобальные переменные и массивы
let counterOfId = [];
let countOfIdUser = 0;

const descriptions = ['Хочу поделиться этим фото со всеми!', 'Мой первый кадр на новый телефон:)', 'Как вам цвета?)', 'Самое яркое воспоминание нашего трипа)))', 'Здесь могла быть ваша реклама', 'Мой источник вдохновения', 'ну милота же', 'Мой лучший кадр эвэр!', 'Круть, да???)', '^___^', 'life is good;)', 'Че, как вам?', 'Мы есть то, что мы думаем', 'Счастье в простоте', 'Сегодня-лучший день в моей жизни...'];
const messageOfComment = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const namesOfUser = ['Артем', 'Анна', 'София', 'Мария', 'Виктория', 'Дарья', 'Вероника', 'Полина', 'Александр', 'Максим', 'Назар', 'Богдан', 'Дмитрий'];

const generationUniqueId = () => {
  let num = getRandomIntInclusive(100, 10000);

  while (true) {
    if (!counterOfId.includes(num)) {
      counterOfId.push(num)
      return num;
    }
    num = getRandomIntInclusive(100, 10000);
  }
};


const getMessageOfComment = () => {
  const arr = [];
  for (let i = 0; i <= getRandomIntInclusive(0, 1); i++) {
    arr[i] = messageOfComment[getRandomIntInclusive(0, messageOfComment.length - 1)];
  }
  return arr;
}

const generationAllComments = () => {
  const arr = [];
  let numberOfComments = getRandomIntInclusive(0, 5);
  for (let i = 0; i <= numberOfComments; i++) {
    arr[i] = {
      id: generationUniqueId(),
      avatar: `img/avatar-${getRandomIntInclusive(1, 6)}`,
      message: getMessageOfComment(),
      name: namesOfUser[getRandomIntInclusive(0, 12)],
    }
  }
  return arr;
};


const getObject = () => {
  const obj = {
    id: ++countOfIdUser,
    url: `./photos/${countOfIdUser}.jpg`,
    description: descriptions[getRandomIntInclusive(0, descriptions.length - 1)],
    likes: getRandomIntInclusive(15, 200),
    comments: generationAllComments(),
  };
  return obj;
}

const getUserPhotos = () => {
  const arr = [];
  for (let i = 0; i <= 24; i++) {
    arr[i] = getObject();
  }
  return arr;
}


export { getUserPhotos };

