const allFlags = [];

const createFlag = (data) => {
  const id = parseInt(allFlags.length);

  const flagData = {
    id,
    createdOn = new Date();
    reason = null;
    description = null;
  };

  allFlags.push(flagData);

  return flagData;
};

export { createFlag, allFlags };