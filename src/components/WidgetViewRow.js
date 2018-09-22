import React from 'react';
import PropTypes from 'prop-types';

export const WidgetViewRow = ({ widget, widgetSelected, onEditWidget, onDeleteWidget, onSelectWidget }) =>
  <tr>
    <td><input type="checkbox" checked={widgetSelected}
      onChange={evt => onSelectWidget({ checked: evt.target.checked, widgetId: widget.id })} /></td>
    <td>{widget.id}</td>
    <td>{widget.name}</td>
    <td>{widget.description}</td>
    <td>{widget.color}</td>
    <td>{widget.size}</td>
    <td>{widget.price}</td>
    <td>{widget.quantity}</td>
    <td>
      <button type="button" onClick={() => onEditWidget(widget.id)}>Edit</button>
      <button type="button" onClick={() => onDeleteWidget(widget.id)}>Delete</button>
    </td>
  </tr>;

WidgetViewRow.propTypes = {
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
  onEditWidget: PropTypes.func.isRequired,
  onDeleteWidget: PropTypes.func.isRequired,
  onSelectWidget: PropTypes.func.isRequired,
};
