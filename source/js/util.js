const getRandomIntInclusive = (min, max) => {
  const error = 'нельзя воодить отрицательное число';
  if (min < 0 || max < 0) {
    return error;
  }
  if (min > max) {
    const a = min;
    min = max;
    max = a;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};




export {getRandomIntInclusive};
