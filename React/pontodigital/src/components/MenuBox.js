import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import ActionExitToAppIcon  from 'material-ui/svg-icons/action/exit-to-app';
import TodayIcon  from 'material-ui/svg-icons/action/today';
import DescriptionIcon  from 'material-ui/svg-icons/action/description';
import SettingsIcon  from 'material-ui/svg-icons/action/settings';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import GroupIcon from 'material-ui/svg-icons/social/group';
import FormatListBulletedIcon from 'material-ui/svg-icons/editor/format-list-bulleted';
import NotificationsActiveIcon from 'material-ui/svg-icons/social/notifications-active';
import Equalizer from 'material-ui/svg-icons/av/equalizer'
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import PropTypes from 'prop-types';
import logo from 'statics/img/logo_autbank.jpg';
import TextField from 'material-ui/TextField';
import Badge from 'material-ui/Badge';
import {black, redA700, white} from 'material-ui/styles/colors';

const styles={  
  ActionExitToApp: {
    width: 40,
    height: 40,
    
  },
  IconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0'
  
  }, 
  Subheader : {
    backgroundColor: '#3F51B5',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingTop: '5%',
    paddingBottom: '5%',
    justifyContent : 'center',
  },
  BadgeNotification : {
    padding: '0 0 0 0',
    margin: 'auto'
  }, 
  BadgeStyleActive : {
    top: 0, 
    right: -3, 
    width:15, 
    height: 15, 
    top: 3,  
    backgroundColor:white,
    color: '#3F51B5'
  },
  BadgeStyle : {
    display: 'none'
  },
  IconButtonNotification : {
    width: 30,
     height: 30
    }

  
}

class  MenuBox extends Component{

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this)
        this.state = {haveNotification : true}
      }
     logOut(){
        this.props.history.push('/')
     }
     
      render(){

        const styless={
            AppBar: {
                display: 'flex',
                width: 'auto',
                margin: this.props.open?'0 0 0 253px':'0 0 0 0',
                paddingLeft: 5
          },
        }

        let NotificationsType = null;
        if (this.state.haveNotification) {
            NotificationsType = <NotificationsActiveIcon color={redA700}/>;
        } else {
            NotificationsType = <NotificationsIcon color={black} />;
        }

        return(
            <div>
            <AppBar 
                 title={ <Badge
                    badgeContent={4}
                    badgeStyle={this.state.haveNotification ? styles.BadgeStyleActive : styles.BadgeStyle  }
                    style={styles.BadgeNotification}
                  >
                  <IconButton iconStyle={styles.IconButtonNotification}>
                        {NotificationsType }
                    </IconButton>
                  </Badge>}
                showMenuIconButton={!this.props.open}
                style={styless.AppBar}
                
                onLeftIconButtonTouchTap={this.props.updateOpenTrue}
                
                onRightIconButtonTouchTap={this.logOut}             
                iconElementRight={
                 /* TODO Colocar efeito no click */
                    <IconButton
                        iconStyle={styles.ActionExitToApp}
                        style={styles.IconButton}
                        tooltip="Sair"
                        tooltipPosition="bottom-left">
                        <ActionExitToAppIcon />
                    </IconButton>}
                />
                
            <Drawer open={this.props.open}>
            <MenuListSelectable />
            </Drawer>

            </div>
        );
    }
}



let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class  MenuListSelectable extends Component{
    constructor(){
      super()
      this.state = {itemConfiguracoesOpen : false}
    }
    render(){
      return(
  <SelectableList defaultValue={1}>
        <Subheader style={styles.Subheader}>
            <img src={logo}  alt="Logo"/>
        </Subheader>
      <ListItem
        value={1}
        leftIcon={<TodayIcon/>}
        primaryText="Calendario"
      />
      <ListItem
        value={2}
        primaryText="Resumo"
        leftIcon={<DescriptionIcon/>}
      />
     
      <ListItem
        value={3}
        leftIcon={<Equalizer/>}
        primaryText="Resumo Geral"
      />
      <ListItem
        primaryText="Configurações"
        leftIcon={<SettingsIcon/>}
        //onClick={ () => { return('')}}
        //open={this.state.itemConfiguracoesOpen}
        isKeyboardFocused={true}
        nestedItems={[
            <ListItem
              value={4}
              
              leftIcon={<GroupIcon/>}
              primaryText="Usuários"
            />,
            <ListItem
            value={5}
            leftIcon={<FormatListBulletedIcon/>}
            primaryText="Categorias"
          />,
          ]}
      />
    </SelectableList>
      );
    }
  }

export default MenuBox;