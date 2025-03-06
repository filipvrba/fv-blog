function divideIntoGroups(groupSize) {
  let objects = this;
  let result = [];

  for (let i = 0; i < objects.length; i += groupSize) {
    result.push(objects.slice(i, i + groupSize));
    continue
  };

  return result
};

Array.prototype.divideIntoGroups = divideIntoGroups