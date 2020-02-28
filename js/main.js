'use strict';

var OBJECT_QUANTITY = 25;
var objectNumber = 0;
var minQuantityLikes = 15;
var maxQuantityLikes = 200;
var minQuantityComment = 2;
var maxQuantityComment = 4;
var minQuantityAvatar = 1;
var maxQuantityAvatar = 6;
var minQuantityMessage = 1;
var maxQuantityMessage = 2;

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
  for (var i = 0; i < OBJECT_QUANTITY; i++) {
    imageAddress.push(i + 1);
  }
  return imageAddress;
};

var getRandomItem = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var COMMENTATORS_NAMES = ['Олег', 'Василий', 'Яна', 'Алёна', 'Игорь', 'Андрей'];
var COMMENTATORS_MESSAGES = [
  'В целом всё неплохо. Но не всё.!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Всё отлично!'
];

var quantityComment = getRandomNumber(minQuantityMessage, maxQuantityMessage);

var getRandomMessage = function (commentQuantity) {
  var comment = getRandomItem(COMMENTATORS_MESSAGES);
  if (commentQuantity === maxQuantityMessage) {
    comment = getRandomItem(COMMENTATORS_MESSAGES) + ' ' + getRandomItem(COMMENTATORS_MESSAGES);
  }
  return comment;
};

getRandomMessage(quantityComment);

var getRandomObject = function (object) {
  var randomObject = [];

  for (var i = 0; i < object; i++) {

    var randomComments = [];
    for (var j = 0; j < getRandomNumber(minQuantityComment, maxQuantityComment); j++) {
      var commentatorDate = [
        {
          avatar: 'img/avatar-' + getRandomNumber(minQuantityAvatar, maxQuantityAvatar) + '.svg',
          message: getRandomMessage(quantityComment),
          name: getRandomItem(COMMENTATORS_NAMES)
        }
      ];
      randomComments.push(commentatorDate);
    }

    var userDate = [
      {
        url: 'photos/' + getImageAddress()[i] + '.jpg',
        description: 'Очередное крутое фото!',
        likes: getRandomNumber(minQuantityLikes, maxQuantityLikes),
        comments: randomComments
      }
    ];
    randomObject.push(userDate);
  }
  return randomObject;
};

var randObject = getRandomObject(OBJECT_QUANTITY);
var randomPhoto = getMix(randObject);

var simularPicture = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function () {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = randomPhoto[i][0].url;
  pictureElement.querySelector('.picture__comments').textContent = randomPhoto[i][0].comments.length;
  pictureElement.querySelector('.picture__likes').textContent = randomPhoto[i][0].likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < randomPhoto.length; i++) {
  fragment.appendChild(renderPicture(randomPhoto[i]));
}

simularPicture.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('img').src = randomPhoto[objectNumber][0].url;
bigPicture.querySelector('.social__caption').textContent = randomPhoto[objectNumber][0].description;
bigPicture.querySelector('.likes-count').textContent = randomPhoto[objectNumber][0].likes;
bigPicture.querySelector('.comments-count').textContent = randomPhoto[objectNumber][0].comments.length;

var renderPictureComments = function () {
  var elements = document.querySelectorAll('.social__comment');
  for (var j = 0; j < elements.length; j++) {
    var element = elements[j];
    element.querySelector('.social__picture').src = randomPhoto[objectNumber][0].comments[objectNumber + j][0].avatar;
    element.querySelector('.social__picture').alt = randomPhoto[objectNumber][0].comments[objectNumber + j][0].name;
    element.querySelector('.social__text').textContent = randomPhoto[objectNumber][0].comments[objectNumber + j][0].message;
  }
};

renderPictureComments();

var addClass = function (tagName, className) {
  var element = document.querySelector(tagName);
  element.classList.add(className);
  return element;
};

addClass('.social__comment-count', 'hidden');
addClass('.comments-loader', 'hidden');
addClass('body', 'modal-open');
