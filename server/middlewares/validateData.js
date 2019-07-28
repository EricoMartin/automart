const validData = (property, data) => property.find(idx => data[idx] === undefined || data[idx] === '');
export default validData;
