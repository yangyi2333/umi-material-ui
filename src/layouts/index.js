import styles from './index.css';


window.onresize = function() {
  window.location.reload();
}
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      {/*<h1 className={styles.title}>Yay! Welcome to umi!</h1>*/}
      {props.children}
    </div>
  );
}

export default BasicLayout;
