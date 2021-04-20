import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export class Navbar extends Component {
  render() {
    const { location } = this.props;
    return (
      <nav className='nav-bar'>
        <AppBar position='static'>
          <Toolbar>
            <img src='../assets/hotel.svg' style={{'maxHeight' : '50px', 'maxWidth' : '50px'}}/>
            <Link to='/home'>
              <Tabs value={ location.pathname === '/home' ? 0 : false }>
                <Tab label="Home" />
              </Tabs>
            </Link>
            <p>
              Hello, {this.props.user}
            </p>
          </Toolbar>
        </AppBar>
      </nav>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
);
