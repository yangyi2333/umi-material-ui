import React from 'react'
import {connect} from 'react-redux';
import styles from './index.css';
import { withStyles  } from '@material-ui/core/styles';
import {MuiAlert  } from '@material-ui/core';
import ContentList from '@/pages/components/content';
import {IsPC} from './components/isPC'
import SplitPane from 'react-split-pane';
import username from '../assets/username.png'
import password from '../assets/password.png'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const newStyles = {
};
const isPc = IsPC();
const mapStateToProps = (state) => {
  return {
    contentList : state.contentList,
    updateTime:state.updateTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginIn:(username,password)=>{
      dispatch({type:'TO_LOGIN_IN',username,password});
    },
    updateList:(times) => {
      dispatch({type:'UPDATE_TIME',times});
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Split extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginFlag:false,
      username:'',
      password:'',
      timer:null,
    }
  }
  componentDidMount() {
    if(sessionStorage.getItem('userInfo')){
      let json = JSON.parse(sessionStorage.getItem('userInfo'))
      this.updateLogin(json)
    }
    // this.props.updateList(this.props.updateTime + 1)
  }
  updateLogin = (json) => {
    this.props.loginIn(json.username,json.password);
    this.setState({loginFlag:true,timer:setInterval(()=>{
        this.props.updateList(this.props.updateTime + 1)
      },10000)});
  };
  submit = ()=>{
    let json = {
      username:this.state.username,
      password:this.state.password,
    };
    if(json.username === 'admin' && json.password === '123456'){
      sessionStorage.setItem('userInfo',JSON.stringify(json));
      this.updateLogin(json)
    }else{
      alert('用户名或密码错误')
      return false
    }
  };
  handleNameChange = (e) => {
    this.setState({username:e.target.value})
  };
  handlePasswordChange = (e) => {
    this.setState({password:e.target.value})
  };
  render(){
    const { classes } = this.props;
    return (
      <div className={styles.normal}>
        <SplitPane
          split={isPc ? "vertical" : 'horizontal'}
          defaultSize={isPc ? 500 : 400}
          minSize={isPc ? 400 : 300}
          maxSize={isPc ? 800 : 500}>
          <div className={styles.leftBar}>
            <div className={styles.loginBox}>
              <div className={styles.loginBoxTitle}>
                {/*<img src={logo} alt=""  className={styles.loginBoxLogo}/>*/}
                Sign in Here
              </div>
              <form noValidate autoComplete="off">
                <div className={styles.inputField}>
                  <img src={username} alt="" className={styles.inputFieldIcon}/>
                  <input type="text" placeholder="Username" value={this.state.username}
                         onChange={this.handleNameChange} />
                </div>
                <div className={styles.inputField}>
                  <img src={password} alt="" className={styles.inputFieldIcon}/>
                  <input type="password" placeholder="Password" value={this.state.password}
                         onChange={this.handlePasswordChange} />
                </div>
              </form>
              <button className={styles.submit} onClick={this.submit}>Sign In</button>
            </div>
          </div>
          <div className={styles.rightBar}>
            <ContentList />
          </div>
        </SplitPane>
      </div>
    )
  }
}
export default withStyles(newStyles)(Split);
