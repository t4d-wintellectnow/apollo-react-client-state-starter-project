import React from 'react';
import PropTypes from 'prop-types';

export class WidgetEditRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.widget.name,
      description: props.widget.description,
      color: props.widget.color,
      size: props.widget.size,
      price: props.widget.price,
      quantity: props.widget.quantity,
    };
  }

  change = evt => {
    this.setState({
      [ evt.target.name ]: evt.target.type === 'number'
        ? Number(evt.target.value)
        : evt.target.value
    });
  }

  saveWidget = () => {

    this.props.onSaveWidget({
      ...this.state,
      id: this.props.widget.id
    });

  }

  render() {

    const { widgetSelected, onSelectWidget, onCancelWidget } = this.props;

    return <tr>
      <td><input type="checkbox" checked={widgetSelected}
        onChange={evt => onSelectWidget({ checked: evt.target.checked, widgetId: this.props.widget.id })} /></td>
      <td>{this.props.widget.id}</td>
      <td><input type="text" name="name" value={this.state.name} onChange={this.change} /></td>
      <td><input type="text" name="description" value={this.state.description} onChange={this.change} /></td>
      <td><input type="text" name="color" value={this.state.color} onChange={this.change} /></td>
      <td><input type="text" name="size" value={this.state.size} onChange={this.change} /></td>
      <td><input type="number" name="price" value={this.state.price} onChange={this.change} /></td>
      <td><input type="number" name="quantity" value={this.state.quantity} onChange={this.change} /></td>
      <td>
        <button type="button" onClick={this.saveWidget}>Save</button>
        <button type="button" onClick={onCancelWidget}>Cancel</button>
      </td>
    </tr>;

  }

}

WidgetEditRow.propTypes = {
  widget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
  widgetSelected: PropTypes.bool.isRequired,
  onSelectWidget: PropTypes.func.isRequired,
  onCancelWidget: PropTypes.func.isRequired,
  onSaveWidget: PropTypes.func.isRequired,
};
