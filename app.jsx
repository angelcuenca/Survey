class Survey extends React.Component {
    constructor(props) {
        super(props);
    }
    
    handleQuestion = (name, position) => {
      //log('onClickOutside() method called from Survey Element');
      this.props.onSubmit(name, position);
    }

    render() {
        if (this.props.components.length === 0) {
            return null;
        }
        
        const renderCommpos = this.props.components.map((Elem, index) => {
            return <Elem onSubmit={this.handleQuestion} key={index} position={this.props.components.length} />
        });

        return (
            <div>
                {renderCommpos}
            </div>
        );
    }
}

class Form extends React.Component {
  const = {
    xmlDate: "<questionModule><title>Question Module Input Type Date?</title><textField type=\"date\"/></questionModule>"
  };
  
  handleSubmit = (name, position) => { 
  	log(this.const.xmlInput);
    this.props.onSubmit(name, position);        
  }
  
  render() {
    return (
      <div id="components">
        <button onClick={()=>this.handleSubmit(Input, this.props.insertAt)} >Input</button>
        <button onClick={()=>this.handleSubmit(Checkbox, this.props.insertAt)} >Checkbox</button>
        <button onClick={()=>this.handleSubmit(Select, this.props.insertAt)} >Dropdown</button>
        <button onClick={()=>this.handleSubmit(Date, this.props.insertAt)} >Date</button>
        <button onClick={()=>this.handleSubmit(File, this.props.insertAt)} >File</button>        
      </div>      
    )
  }
}

class CheckboxOption extends React.Component {
	state = {  	
    optionName: '',
    position: this.props.position
  };
  
	handleCheckboxOption = (optionName, position) => {
  	this.props.onSubmit(optionName, position); 
  };
  
  render(){
    return(
      <div> 
        <label> 
          Option {this.state.position}: 
          <input 
            name="input"
            type="text"
            onChange={(event) => this.handleCheckboxOption( event.target.value, this.state.position )}
            />
        </label>
      </div>
    )
  }
}

class Checkbox extends React.Component {
  state = {  	
    xmlCheckbox: "<questionModule><title>QuestionName ?</title><multipleChoice type=\"checkbox\">Options</multipleChoice></questionModule>",
    options: [],
    questionName: ''
  };
  
  handleAddOption = () => {
  	this.setState(prevState => ({
      options: prevState.options.concat("#")
    }));       
  };
  
  handleAddQuestion = () => {
    var optionsXML = "";
    this.state.options.forEach(function(element) {
         optionsXML += "<option>"+ element +"</option>";  
    });
        
    var addName = this.state.xmlCheckbox.replace("QuestionName", this.state.questionName);
    var addOptions = addName.replace("Options", optionsXML);  
    //Here is the position to insert question
    this.props.onSubmit(addOptions, 0);        
  }
  
  handleOptions = (optionName, position) => { 
    const options = this.state.options;
    options[position - 1] = optionName;
    this.setState({
        options
    });
  }
  
  render() {
    return(
      <div id="question">
          <h3> Checkbox Question </h3>
          <div> 
            <input
              placeholder="Type your question name"
              value={this.state.questionName}
              onChange={(event) => this.setState({ questionName: event.target.value })}
              className="question-name"
              type="text" />
          </div>
          <div>
            <div>   
            
              <button id="addOption" onClick={()=>this.handleAddOption()}>+</button> 
            </div>          
            <div>
              {this.state.options.map(option => <CheckboxOption {...option} onSubmit={this.handleOptions} position={this.state.options.length} />)}      
            </div>
          </div>                 
          <button id="add" onClick={()=>this.handleAddQuestion()}>Add</button>
      </div>
    )
  }
}

class SelectOption extends React.Component {
	state = {  	
    optionName: '',
    position: this.props.position
  };
  
	handleSelectOption = (optionName, position) => {
  	this.props.onSubmit(optionName, position); 
  };
  
  render(){
    return(
      <div> 
        <label> 
          Option {this.state.position}: 
          <input 
            name="input"
            type="text"
            onChange={(event) => this.handleSelectOption( event.target.value, this.state.position )}
            />
        </label>
      </div>
    )
  }
}

class Select extends React.Component {
  state = {
    pos: this.props.position,
     xmlCheckbox: "<questionModule><title>QuestionName ?</title><multipleChoice type=\"select\">Options</multipleChoice></questionModule>",
    options: [],
    questionName: ''
  };
  
  handleAddOption = () => {
  	this.setState(prevState => ({
      options: prevState.options.concat("#")
    }));       
  };
  
  handleAddQuestion = () => {
    var optionsXML = "";
    this.state.options.forEach(function(element) {
         optionsXML += "<option>"+ element +"</option>";  
    });
        
    var addName = this.state.xmlCheckbox.replace("QuestionName", this.state.questionName);
    var addOptions = addName.replace("Options", optionsXML);  
    //Here is the position to insert question
    this.props.onSubmit(addOptions, 0);        
  }
  
  handleOptions = (optionName, position) => { 
    const options = this.state.options;
    options[position - 1] = optionName;
    this.setState({
        options
    });
  }
  
  render() {
    return(
      <div id="question">
          <h3> Dropdown Question </h3>
          <div> 
            <input
              placeholder="Type your question name"
              value={this.state.questionName}
              onChange={(event) => this.setState({ questionName: event.target.value })}
              className="question-name"
              type="text" />
          </div>
          <div>
            <div>   
            
              <button id="addOption" onClick={()=>this.handleAddOption()}>+</button> 
            </div>          
            <div>
              {this.state.options.map(option => <SelectOption {...option} onSubmit={this.handleOptions} position={this.state.options.length} />)}      
            </div>
          </div>                 
          <button id="add" onClick={()=>this.handleAddQuestion()}>Add</button>
      </div>
    )
  }
}

class Input extends React.Component {
  state = {
    pos: this.props.position,
    xmlInput: "<questionModule><title>QuestionName?</title><textField type=\"text\"></textField></questionModule>",
    inputValue: ''
  };
  
  handleQuestion = (inputValue) => { 
    this.setState({ inputValue: '' });
    //Here is to insert question position
    this.props.onSubmit(this.state.xmlInput.replace("QuestionName", inputValue), 0);        
  }
  
  render() {
    return( 
      <div id="question"> 
         <h3> Input Question </h3>
         <div>            
            <input
              placeholder="Type your question name"
              value={this.state.inputValue}
              onChange={(event) => this.setState({ inputValue: event.target.value })}
              className="question-name"
              type="text" />
          </div>
          <button id="add" onClick={()=>this.handleQuestion(this.state.inputValue)}>Add</button>
      </div>
    )
  }
}

class Date extends React.Component {
	state = {
      pos: this.props.position,
 			xmlDate: "<questionModule><title>QuestionName ?</title><textField type=\"date\"/></questionModule>",
      inputValue: ''
  };
  
  handleQuestion = (inputValue) => { 
    this.setState({ inputValue: '' });
    //Here is to insert question position
    this.props.onSubmit(this.state.xmlDate.replace("QuestionName", inputValue), 0);        
  }
  
  render() {
    return( 
      <div id="question"> 
         <h3> Date Question </h3>
         <div>            
            <input
              placeholder="Type your question name"
              value={this.state.inputValue}
              onChange={(event) => this.setState({ inputValue: event.target.value })}
              className="question-name"
              type="text" />
          </div>
          <button id="add" onClick={()=>this.handleQuestion(this.state.inputValue)}>Add</button>
      </div>
    )
  }  
}

class File extends React.Component {
   state = {
      pos: this.props.position,
 			xmlFile: "<questionModule><title>QuestionName ?</title><file/></questionModule>",
      inputValue: ''
  };
  
  handleQuestion = (inputValue) => { 
    this.setState({ inputValue: '' });
    //Here is to insert question position
    this.props.onSubmit(this.state.xmlFile.replace("QuestionName", inputValue), 0);        
  }
  
  render() {
    return( 
      <div id="question"> 
         <h3> File Question </h3>
         <div>            
            <input
              placeholder="Type your question name"
              value={this.state.inputValue}
              onChange={(event) => this.setState({ inputValue: event.target.value })}
              className="question-name"
              type="text" />
          </div>
          <button id="add" onClick={()=>this.handleQuestion(this.state.inputValue)}>Add</button>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    components: [],
    xml: ''
  };

  addNewElement = (element, number) => {  
      this.setState(prevState => {
        //log("llega"+element +" con "+number);
        const components = prevState.components.slice();
        components.splice(number, 0, element);
        return { components };
      });
  };
  
  addXMLElement = (xml, position) => {  
      this.setState(prevState => ({
        //log("llega"+element +" con "+number);
        xml: prevState.xml.concat(xml)
      }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewElement} components={this.state.components} />
        <div id="line-separator"></div>
        <Survey onSubmit={this.addXMLElement} components={this.state.components} />    
        <div>
        XML: {this.state.xml} *
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
