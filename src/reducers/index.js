import {totalState }from '../state';
export default function(state=totalState,action){
  switch (action.type) {
    case 'to_login_in':
      return Object.assign({},state,{isLogin:true});
    case 'to_login_out':
      return Object.assign({},state,{isLogin:false});
    case 'change_username':
      return Object.assign({},state,{username:action.value});
    case 'change_password':
      return Object.assign({},state,{password:action.value});
    case 'update_time':
      return Object.assign({},state,{updateTime:action.value});
    case 'update_list':
      return Object.assign({},state,{contentList:action.list});
    default:
      return state;
  }
}
