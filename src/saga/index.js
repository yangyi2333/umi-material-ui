import {take,all,fork,put,call} from 'redux-saga/effects';


function * changeList(times){
  try {
    let res = [];
    for(let i = 0;i < 100000 ; i++){
      res.push(i)
    }
    yield put({type:'update_list',list:res});
  } catch(error) {
    yield put({type:'update_list_error', error});
  }
}
function * watchIsLogin(){
  while(true){
    //监听登入事件
    const action1 = yield take('TO_LOGIN_IN');

    yield put({type:'to_login_in'});
    yield put({type:'change_password',value:action1.password});
    yield put({type:'change_username',value:action1.username});
    //登陆成功后获取列表
    yield fork(changeList);
  }
}
function * watchUpdateTime(){
  while(true){
    //监听列表更新事件
    const action = yield take('UPDATE_TIME');
    yield put({type:'update_time',value:action.times});
    try {
      let res = [];
      for(let i = action.times;i < 100000 + action.times ; i++){
        res.push(i)
      }
      yield put({type:'update_list',list:res});
    } catch(error) {
      yield put({type:'update_list_error', error});
    }
  }
}
export default function * rootSaga() {
  yield all([
    fork(watchIsLogin),
    fork(watchUpdateTime),
  ]);
}
