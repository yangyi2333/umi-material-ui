import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AutoSizer from 'react-virtualized-auto-sizer'
import {IsPC} from './isPC'

const isPc = IsPC();
const newStyles = {
  root: {
    width: '100%',
    height: '100%',
  },
  item:{
    height: 100,
  },
  itemRight:{
    textAlign:'right'
  }
};
class ContentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginFlag:false,
      listDom:'',
    }
  }
  componentWillReceiveProps(nextProps,nextContext){
    console.log(nextProps.loginFlag)
    if(!this.state.loginFlag && nextProps.loginFlag){
      this.setState({loginFlag:true},()=>{
        this.renderList()
      })
    }
  }
  componentDidMount() {
    if(sessionStorage.getItem('userInfo')){
      this.setState({loginFlag:true},()=>{
        this.renderList()
      })
    }else{
      this.renderList()
    }
  }

  renderRow = ({ index, style }) => {
    return (
      <ListItem button style={style} className={this.props.classes.item}>
        <ListItemText primary={`Item ${index + 1}`} />
        <ListItemText primary={`Item ${index + 1}`} className={this.props.classes.itemRight}/>
      </ListItem>
    )
  }
  renderList(){
    console.log(this.state.loginFlag)
    this.setState({listDom:this.state.loginFlag ? (
        <AutoSizer>
          {
            ({height,width}) => (
              <FixedSizeList height={height} width={isPc ? 1520 : width * 1.5} itemSize={100} itemCount={100000}>
                { this.renderRow }
              </FixedSizeList>
            )
          }
        </AutoSizer>
      ) : (<div>请登录后查看内容</div>)})
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.listDom}
      </div>
    )
  }
}
export default withStyles(newStyles)(ContentList);
