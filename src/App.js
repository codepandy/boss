import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, List } from 'antd-mobile';
import { addCreator, removeCreator, addAsync } from './index.redux';
import { connect } from 'react-redux';
const Item = List.Item;

//
@connect(
  //要把state中的哪个属性放到props中
  (state) => ({ num: state.reducer }),
  //要把什么方法放到props，会自动dispath
  { addCreator, removeCreator, addAsync })
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: ['zhangan', '里斯', 'wangpengpeng']
    }
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary">start</Button>
        <List renderHeader={() => "list header"}>
          <Item arrow="horizontal">zhangsan</Item>
          <Item arrow="up" extra={"右边内容"}>zhongguorenmin</Item>
          <Item arrow="down">waixingren</Item>
        </List>
        <h1>现在有机关枪{this.props.num}把。</h1>
        <button onClick={this.props.addCreator}>add</button>
        <button onClick={this.props.removeCreator}>remove</button>
        <button onClick={this.props.addAsync}>addAsync</button>
      </div >
    );
  }
}

// function mapStateToProps(state) {
//   return { num: state }
// }
// App = connect(mapStateToProps, { addCreator, removeCreator, addAsync })(App);
export default App;
