import * as React from 'react';
import * as PropTypes from 'prop-types';

export class WidgetForm extends React.Component {

  static propTypes = {
    onSubmitWidget: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
  };

  static defaultProps = {
    buttonText: 'Submit Widget',
  };
  
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      name: '',
      description: '',
      color: '',
      size: '',
      price: 0,
      quantity: 0,
    };
  }

  change = evt => {
    this.setState({
      [ evt.target.name ]: evt.target.type === 'number'
        ? Number(evt.target.value)
        : evt.target.value
    });
  }

  submitWidget = evt => {
    evt.preventDefault();
    
    this.props.onSubmitWidget({
      ...this.state,
    });

    this.setState(this.getInitialState());
  };

  render() {
    return <form>
      <div>
        <label htmlFor="name-input">Name:</label>
        <input type="text" id="name-input" name="name" value={this.state.name} onChange={this.change} />
      </div>
      <div>
        <label htmlFor="description-input">Description:</label>
        <input type="text" id="description-input" name="description" value={this.state.description} onChange={this.change} />
      </div>
      <div>
        <label htmlFor="color-input">Color:</label>
        <input type="text" id="color-input" name="color" value={this.state.color} onChange={this.change} />
      </div>
      <div>
        <label htmlFor="size-input">Size:</label>
        <input type="text" id="size-input" name="size" value={this.state.size} onChange={this.change} />
      </div>
      <div>
        <label htmlFor="price-input">Price:</label>
        <input type="number" id="price-input" name="price" value={this.state.price} onChange={this.change} />
      </div>
      <div>
        <label htmlFor="quantity-input">Quantity:</label>
        <input type="number" id="quantity-input" name="quantity" value={this.state.quantity} onChange={this.change} />
      </div>
      <button onClick={this.submitWidget}>{this.props.buttonText}</button>
    </form>;
  }


}