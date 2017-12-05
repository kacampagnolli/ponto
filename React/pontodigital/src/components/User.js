import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Switch,Route,Router} from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import Create from 'material-ui/svg-icons/content/create';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Stepper from './Stepper.js';
import MenuBox from './MenuBox.js';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
  divTable:{
    maxWidth:800,
  }
};

const tableData = [
  {
    name: 'John Smith',
    status: 'Employed',
  },
  {
    name: 'Randal White',
    status: 'Unemployed',
  },
  {
    name: 'Stephanie Sanders',
    status: 'Employed',
  },
  {
    name: 'Steve Brown',
    status: 'Employed',
  },
  {
    name: 'Joyce Whitten',
    status: 'Employed',
  },
  {
    name: 'Samuel Roberts',
    status: 'Employed',
  },
  {
    name: 'Adam Moore',
    status: 'Employed',
  },
];

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */

export default class UserBox extends Component{
  constructor(props){
    super(props);
    console.log(props);
  }

  render(){
    return(
        <Router history={this.props.history}>
               <div>
                <Route exact path={"/ponto/configuracoes/usuarios"} component={User}/>
                <Route exact path={"/ponto/configuracoes/usuarios/usuario"} component={Stepper}/>
            </div>
        </Router> 
    );
}
}

class User extends Component {



  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '300px',
    coments: [],
  };

  componentWillMount(){
    console.log("Aqui");
    fetch('http://localhost:3000/comments', {
      method: 'get'
    }).then((response) => response.json())  
      .then((responseJson) => {
        this.setState({coments:responseJson});
        const comentario = this.state.coments;
        comentario.map((coment)=>{
          console.log(coment.id);
        });
    }).catch(function(err) {
      // Error :(
    });



  }

  novo (e) {
    e.preventDefault();
    this.props.history.push('/ponto/configuracoes/usuarios/usuario');

  };

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

  render() {
    return (
      <div style={styles.divTable}>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Nome">Nome</TableHeaderColumn>
              <TableHeaderColumn tooltip="Categoria">Categoria</TableHeaderColumn>
              <TableHeaderColumn tooltip="Equipe">Equipe</TableHeaderColumn>
              <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
              <TableHeaderColumn tooltip="action"></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>{row.status}</TableRowColumn>
                <TableRowColumn>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                >
                    <Create />
                </IconButton>
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                >
                    <Clear />
                </IconButton>
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={{marginTop: 24, marginBottom: 12, display:'flex', justifyContent:'space-between'}}>
          <FlatButton
            label="Back"
            style={{marginRight: 12}}
          />
          <RaisedButton
            label="Novo"
            primary={true}
            onClick={this.novo.bind(this)}
          />
        </div>
        </div>
    );
  }
}