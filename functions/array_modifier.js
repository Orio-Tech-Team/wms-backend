const selectAllFromArray = (myArray) => {
  var query_temp = "(";
  myArray.forEach((each_item) => {
    query_temp = query_temp + each_item + ",";
  });
  query_temp = query_temp.substring(0, query_temp.length - 1);
  return query_temp + ")";
};
module.exports = selectAllFromArray;
