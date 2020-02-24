'use strict';

var getMix = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getImageAddress = function () {
  var imageAddress = [];
  for (var i = 0; i <= 25; i++) {
    imageAddress.push(i);
  }
  return imageAddress;
};

// var getRandomItem = function (arr) {
//   var rand = Math.floor(Math.random() * arr.length);
//   return arr[rand];
// };

// var commentatorsNames = ['Олег', 'Василий', 'Яна', 'Алёна', 'Игорь', 'Андрей'];
// var commentatorsMessages = [
//   'В целом всё неплохо. Но не всё.!',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
//   'Всё отлично!'
// ];

// var commentatorDate = [
//   {
//     avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
//     message: getRandomItem(commentatorsMessages),
//     name: getRandomItem(commentatorsNames)
//   }
// ];

var getRandomObject = function (object) {
  var randomObject = [];

  for (var i = 1; i <= object; i++) {
    var userDate = [
      {
        url: 'photos/' + getImageAddress()[i] + '.jpg',
        description: 'Классное фото',
        likes: getRandomNumber(15, 200),
        comments: getRandomNumber(1, 5)
      }
    ];
    randomObject.push(userDate);
  }
  return randomObject;
};

var randObject = getRandomObject(25);
var randomPhoto = getMix(randObject);

var simularPicture = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function () {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = randomPhoto[i][0].url;
  pictureElement.querySelector('.picture__comments').textContent = randomPhoto[i][0].comments;
  pictureElement.querySelector('.picture__likes').textContent = randomPhoto[i][0].likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < randomPhoto.length; i++) {
  fragment.appendChild(renderPicture(randomPhoto[i]));
}

simularPicture.appendChild(fragment);
