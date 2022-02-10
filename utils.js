const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
};



//finding index

const getIndex = (element, array) => array.indexOf(element);
 
  module.exports = {getRandomElement, getIndex};
