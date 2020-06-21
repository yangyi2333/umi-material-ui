import React from 'react'
import {connect} from 'react-redux';
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
const mapStateToProps = (state) => {
  return {
    contentList : state.contentList,
    isLogin : state.isLogin,
  };
};
@connect(mapStateToProps)
class ContentList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loginFlag:false,
      listDom:'',
    }
  }
  componentWillReceiveProps(nextProps,nextContext){
    if(!this.state.loginFlag && nextProps.isLogin){
      this.setState({loginFlag:true},()=>{
        this.renderList(nextProps.contentList)
      })
    }
    if(nextProps.contentList && nextProps.contentList.length > 0){
      this.renderList(nextProps.contentList)
    }
  }
  componentDidMount() {
      this.renderList()
  }

  renderRow = ({ data,index, style }) => {
    return (
      <ListItem button style={style} className={this.props.classes.item}>
        <ListItemText primary={`Item ${data[index]}`} />
        <ListItemText primary={`Item ${data[index]}`} className={this.props.classes.itemRight}/>
      </ListItem>
    )
  }
  renderList(contentList){
    let dom = '';
    if(!this.state.loginFlag){
      dom = (<div>请登录后查看内容</div>);
    }else if(contentList.length > 0){
      dom = (
        <AutoSizer>
          {
            ({height,width}) => (
              <FixedSizeList height={height} width={isPc ? 1520 : width * 1.5} itemSize={100} itemCount={100000}
                             itemData={contentList}>
                { this.renderRow }
              </FixedSizeList>
            )
          }
        </AutoSizer>
      )
    }
    this.setState({listDom:dom})
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
