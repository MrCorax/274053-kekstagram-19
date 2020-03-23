'use strict';
//  добавить константы ниже, смотри ТЗ
var OBJECT_QUANTITY = 25;
var objectNumber = 0;
var MIN_QUANTITY_LIKES = 15;
var MAX_QUANTITY_LIKES = 200;
var minQuantityComment = 2;
var maxQuantityComment = 4;
var MIN_QUANTITY_AVATAR = 1;
var MAX_QUANTITY_AVATAR = 6;
var MIN_QUANTITY_MESSAGE = 1;
var MAX_QUANTITY_MESSAGE = 2;
var IMG_PREVIEW_DEFAULT_VALUE = 100;
var IMG_PREVIEW_MAX_VALUE = 100;
var IMG_PREVIEW_MIN_VALUE = 25;
var IMG_PREVIEW_STEP_VALUE = 25;
var ESC_KEY = 'Escape';
var MAX_EFFECT_LEVEL = 100;

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

var quantityComment = getRandomNumber(MIN_QUANTITY_MESSAGE, MAX_QUANTITY_MESSAGE);

var getRandomMessage = function (commentQuantity) {
  var comment = getRandomItem(COMMENTATORS_MESSAGES);
  if (commentQuantity === MAX_QUANTITY_MESSAGE) {
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
          avatar: 'img/avatar-' + getRandomNumber(MIN_QUANTITY_AVATAR, MAX_QUANTITY_AVATAR) + '.svg',
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
        likes: getRandomNumber(MIN_QUANTITY_LIKES, MAX_QUANTITY_LIKES),
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

// У функции ниже, поиск по всему документу... надо подумать
var addClass = function (tagName, className) {
  var element = document.querySelector(tagName);
  element.classList.add(className);
  return element;
};

var removeClass = function (tagName, className) {
  var element = document.querySelector(tagName);
  element.classList.remove(className);
  return element;
};

// onThumbnailClick переименовать и переделать в лаконичный вид
var thumbnails = document.querySelectorAll('.picture');
var bigPicture = document.querySelector('.big-picture');

var onThumbnailClick = function (thumbnail, photo, object) {
  thumbnail.addEventListener('click', function () {
    photo.classList.remove('hidden');
    photo.querySelector('img').src = randomPhoto[object][0].url;
    photo.querySelector('.social__caption').textContent = randomPhoto[object][0].description;
    photo.querySelector('.likes-count').textContent = randomPhoto[object][0].likes;
    photo.querySelector('.comments-count').textContent = randomPhoto[object][0].comments.length;

    var renderPictureComments = function () {
      var elements = document.querySelectorAll('.social__comment');
      for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        element.querySelector('.social__picture').src = randomPhoto[object][0].comments[objectNumber + j][0].avatar;
        element.querySelector('.social__picture').alt = randomPhoto[object][0].comments[objectNumber + j][0].name;
        element.querySelector('.social__text').textContent = randomPhoto[object][0].comments[objectNumber + j][0].message;
      }
    };
    renderPictureComments();

    addClass('.social__comment-count', 'hidden');
    addClass('.comments-loader', 'hidden');
    addClass('body', 'modal-open');
  });
};

for (var j = 0; j < thumbnails.length; j++) {
  var numberOfObject = 0;
  numberOfObject += j;
  onThumbnailClick(thumbnails[j], bigPicture, numberOfObject);
}

var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var onBigPictureCloseClick = function () {
  addClass('.big-picture', 'hidden');
  removeClass('body', 'modal-open');
};
bigPictureClose.addEventListener('click', onBigPictureCloseClick);

var body = document.querySelector('body');
var imgUpload = document.querySelector('.img-upload');
var popupRedactOpen = imgUpload.querySelector('#upload-file');
var popupRedact = imgUpload.querySelector('.img-upload__overlay');
var popupRedactClose = imgUpload.querySelector('.img-upload__cancel');

var buttonSizeIncrease = popupRedact.querySelector('.scale__control--bigger');
var burronSizeDecrease = popupRedact.querySelector('.scale__control--smaller');
var fieldShowSize = popupRedact.querySelector('.scale__control--value');
var imgPreview = popupRedact.querySelector('.img-upload__preview');
var effectLevel = popupRedact.querySelector('.effect-level');
var newValueSize = IMG_PREVIEW_DEFAULT_VALUE;

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeRedactPopup();
  }
};

var openRedactPopup = function () {
  popupRedact.classList.remove('hidden');
  effectLevel.classList.add('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
  fieldShowSize.value = IMG_PREVIEW_DEFAULT_VALUE + '%';
};

var closeRedactPopup = function () {
  popupRedact.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
  popupRedactOpen.value = '';
  imgPreview.style.transform = '';
  newValueSize = IMG_PREVIEW_DEFAULT_VALUE;
};

popupRedactOpen.addEventListener('change', openRedactPopup);

popupRedactClose.addEventListener('click', closeRedactPopup);

var getScaleSize = function (newSize) {
  var slaceChange = newSize / 100;
  imgPreview.style.transform = 'scale(' + slaceChange + ')';
  newValueSize = newSize;
  fieldShowSize.value = newSize + '%';
};

var decreasePreviewSize = function () {
  if (newValueSize > IMG_PREVIEW_MIN_VALUE) {
    var newFieldShowSize = newValueSize - IMG_PREVIEW_STEP_VALUE;
    getScaleSize(newFieldShowSize);
  }
};

var increasePreviewSize = function () {
  if (newValueSize < IMG_PREVIEW_MAX_VALUE) {
    var newFieldShowSize = newValueSize + IMG_PREVIEW_STEP_VALUE;
    getScaleSize(newFieldShowSize);
  }
};

burronSizeDecrease.addEventListener('click', decreasePreviewSize);

buttonSizeIncrease.addEventListener('click', increasePreviewSize);

var effects = popupRedact.querySelector('.img-upload__effects');
var changeEffects = function (evt) {
  if (imgPreview.classList.length > 1) {
    imgPreview.classList = 'img-upload__preview';
  }
  imgPreview.classList.add('effects__preview--' + evt.target.value + '');
  effectLevel.classList.remove('hidden');
  effectValue.value = MAX_EFFECT_LEVEL;
  if (evt.target.matches('input[id="effect-none"]')) {
    effectLevel.classList.add('hidden');
  }
};

effects.addEventListener('change', changeEffects);

var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var effectValue = effectLevel.querySelector('.effect-level__value');
// var effectDepth = effectLevel.querySelector('.effect-level__depth');
var bar = effectLevel.querySelector('.effect-level__line');

var getPinPosition = function () {
  var calcEffectLevel = (effectLevelPin.getBoundingClientRect().left + effectLevelPin.getBoundingClientRect().width / 2) - bar.getBoundingClientRect().left;
  var currentEffectLevel = +calcEffectLevel.toFixed(1);
  var barLength = bar.getBoundingClientRect().width;
  var newPinPosition = (currentEffectLevel * MAX_EFFECT_LEVEL) / barLength;
  effectValue.value = newPinPosition;
};

effectLevelPin.addEventListener('mouseup', getPinPosition);

// функцию ниже нужно переделать.
// var getValueEffect = function (evt) {
//   var x = (evt.offsetX === undefined) ? evt.layerX : evt.offsetX;
//   var barLength = 453;
//   var currentEffectLevel = x;
//   var maxEffectLevel = 100;
//   var value = Math.round((currentEffectLevel * MAX_EFFECT_LEVEL) / barLength);
//   effectValue.value = value;
//   effectLevelPin.style.left = effectValue.value + '%';
//   effectDepth.style.width = effectValue.value + '%';
// };
//
// bar.addEventListener('click', getValueEffect);
