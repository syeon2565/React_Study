import './App.css';
import TOC from "./Component/TOC"
import ReadContent from "./Component/ReadContent"
import Subject from "./Component/Subject"
import Control from "./Component/Control"
import { Component } from 'react';
import CreateContent from './Component/CreateContent';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'create',
      selected_content_id:2,
      Subject: { title: 'WEB', sub: "World Wid Web!" },
      welcome: { title: 'Welcome', desc: 'Hello, React!!!' },
      Content: [
        { id: 1, title: 'HTML', desc: 'HTML is for informatin' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }
  render() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.Content.length) {
        var data = this.state.Content[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create'){
      _article = <CreateContent></CreateContent>
    }
    console.log('render', this);
    return (
      <div className="App">
        <Subject
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        >
        </Subject>
        <TOC onChangePage={function (id) {
          this.setState({
            mode: 'read',
            selected_content_id: Number(id)
          });
        }.bind(this)}
          data={this.state.Content}
        ></TOC>
       <Control onChangeMode={function(_mode){
         this.setState({
           mode:_mode
         });
       }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;
