import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-bootstrap';
import Menu from './common/Menu';
import '../stylesheets/main.scss';

import { USERS_FETCH_LIST } from '../sagas/index';

// App component
export class App extends Component {
  // pre-render logic
  componentWillMount() {
    // the first time we load the app, we need that users list
    this.props.dispatch({ type: USERS_FETCH_LIST });
  }

  // render
  render() {
    // show the loading state while we wait for the app to load
    const { users, children } = this.props;
    if (!users.length) {
      return (
        <ProgressBar active now={100} />
      );
    }

    // render
    return (
      <div className="container">
        <div>
          <Menu />
        </div>
        <div>
          {children}
        </div>
        <div className="footer">
          <img src="/media/logo.svg" alt="Logo" />
          <span>
            Simple users app built with {' '}
            <a href="http://redux-minimal.js.org/" target="_blank" rel="noopener noreferrer">redux-minimal</a>
          </span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func,
};

App.defaultProps = {
  users: [],
  children: null,
};

// export the connected class
function mapStateToProps(state) {
  return {
    users: state.users || [],
  };
}
export default connect(mapStateToProps)(App);
