import React from 'react'
import styles from './index.css';
import { withStyles  } from '@material-ui/core/styles';
import {Button,TextField } from '@material-ui/core';


const newStyles = {
  root : {
    padding: '0 30px',
  }
};
class Split extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    // const classes = useStyles();
    const { classes } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.leftBar}>
          <div className={styles.loginBox}>
            <div className={styles.loginBoxTitle}>
              Umi-demo
            </div>
            <form noValidate autoComplete="off">
              <TextField required id="filled-basic" label="Username" variant="filled"
                         margin="normal" fullWidth/>
              <TextField
                required
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                margin="normal" fullWidth
              />
            </form>
            <Button variant="contained" color="primary" className={classes.margin}>
              Sign In
            </Button>
          </div>
        </div>
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
//       <div className={styles.dragBar} draggable
//            onMouseDown={this.onMouseDown}>
//
//       </div>
//       <div className={styles.rightBar}>
//
//       </div>
//     </div>
//   );
// }
export default withStyles(newStyles)(Split);
