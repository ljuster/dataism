import * as React from 'react';
import * as css from './HelloTypescript.scss';

interface Props {
  name: string
}

interface State {
  name: string
}

export default class HelloWorld extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = { name: this.props.name };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <div>
        <h3 className={css['test-variable']}>
          Hello, {this.state.name} from TypeScript!
        </h3>
        <hr />
        <form >
          <label htmlFor="name">
            Say hello to:
          </label>
          <input
            id="name"
            type="text"
            value={this.state.name}
            onChange={(e) => this.updateName(e.target.value)}
          />
        </form>
      </div>
    );
  }
}
