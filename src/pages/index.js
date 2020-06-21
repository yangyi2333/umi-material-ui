import React from 'react'
import styles from './index.css';
import { withStyles  } from '@material-ui/core/styles';
import {Button,TextField } from '@material-ui/core';
import ContentList from '@/pages/components/content';
import {IsPC} from './components/isPC'
import SplitPane from 'react-split-pane';

const newStyles = {
  root : {
    padding: '0 30px',
  }
};
const isPc = IsPC();
class Split extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginFlag:false,
      username:'',
      password:'',
    }
  }
  componentDidMount() {
  }

  submit = ()=>{
    let json = {
      username:this.state.username,
      password:this.state.password,
    };
    if(json.username === 'admin' && json.password === '123456'){
      sessionStorage.setItem('userInfo',JSON.stringify(json));
      this.setState({loginFlag:true})
    }else{
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
                Umi-demo
              </div>
              <form noValidate autoComplete="off">
                <TextField required id="filled-basic" label="Username" variant="filled"
                           margin="normal" fullWidth  value={this.state.username} onChange={this.handleNameChange}/>
                <TextField
                  required
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                  margin="normal" fullWidth
                  value={this.state.password} onChange={this.handlePasswordChange}
                />
              </form>
              <Button variant="contained" color="primary" className={classes.margin} onClick={this.submit}>
                Sign In
              </Button>
            </div>
          </div>
          <div className={styles.rightBar}>
            <ContentList loginFlag={this.state.loginFlag}/>
          </div>
        </SplitPane>
      </div>
    )
  }
}
// export default function(split) {
//   const classes = useStyles();
//   let active = false,position = null;
//   function onMouseDown(event) {
//     console.log(event)
//     const eventWithTouches = Object.assign({}, event, {
//       touches: [{ clientX: event.clientX, clientY: event.clientY }],
//     });
//     onTouchStart(eventWithTouches);
//   }
//   function onTouchStart(event) {
//     const { allowResize, split } = this.props;
//     if (allowResize) {
//       unFocus(document, window);
//       const position =
//         split === 'vertical'
//           ? event.touches[0].clientX
//           : event.touches[0].clientY;
//       this.setState({
//         active: true,
//         position,
//       });
//     }
//   }
//   function onMouseMove() {
//
//   }
//   function onTouchMove() {
//
//   }
//   function onMouseUp() {
//
//   }
//   return (
//     <div className={styles.normal}>
//       <div className={styles.leftBar}>
//         <div className={styles.loginBox}>
//           <div className={styles.loginBoxTitle}>
//             Umi-demo
//           </div>
//           <form noValidate autoComplete="off">
//             <TextField required id="filled-basic" label="Username" variant="filled"
//                        margin="normal" fullWidth/>
//             <TextField
//               required
//               id="filled-password-input"
//               label="Password"
//               type="password"
//               autoComplete="current-password"
//               variant="filled"
//               margin="normal" fullWidth
//             />
//           </form>
//           <Button variant="contained" color="primary" className={classes.margin}>
//             Sign In
//           </Button>
//         </div>
//       </div>
//       {/*<div className={styles.dragBar} draggable onDragEnd={} onDragOver={}>*/}

//     </div>
//   );
// }
export default withStyles(newStyles)(Split);
