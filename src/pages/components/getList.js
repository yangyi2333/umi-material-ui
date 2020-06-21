let list = [],times = 0;
setList();
function setList(index) {
  let arr = [];
  for(let i = index;i < 100 + index; i++){
    arr.push(i)
  }
  list = arr;
  times++;
}
export function getList(callback) {
  callback(list);
  setList(times);
}
