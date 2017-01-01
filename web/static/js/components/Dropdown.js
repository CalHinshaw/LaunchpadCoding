import React from 'react'

import { observer } from 'mobx-react'
import { observable } from 'mobx'


export default @observer class Dropdown extends React.Component {
  @observable showBody = false;

  _toggleShow() {
    this.showBody = !this.showBody;
  }

  render() {
    const header = this.props.children[0];
    const body = this.props.children.slice(1);

    return (
      <div className="dropdown">
        <div onClick={this._toggleShow.bind(this)}>
          {this.showBody
            ? <img className='test-status' src="/images/down_arrow.svg" />
            : <img className='test-status' src="/images/right_arrow.svg" />
          }
          {header}
        </div>

        {this.showBody ? body : null}
      </div>
    );
  }
  
};
