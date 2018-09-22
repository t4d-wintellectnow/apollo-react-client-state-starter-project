import * as React from 'react';
import PropTypes from 'prop-types';

import { WidgetViewRow } from './WidgetViewRow';
import { WidgetEditRow } from './WidgetEditRow';

export const WidgetTable = ({
  widgets, editWidgetId, selectedWidgetIds,
  onDeleteWidget, onEditWidget, onSaveWidget, onCancelWidget,
  onDeleteSelectedWidgets, onAddSelectedWidgetId, onRemoveSelectedWidgetId,
}) => {

  const selectWidget = ({ checked, widgetId }) => {
    if (checked) {
      onAddSelectedWidgetId(widgetId);
    } else {
      onRemoveSelectedWidgetId(widgetId);
    }
  };

  return <React.Fragment>
    <button type="button" onClick={() => onDeleteSelectedWidgets(selectedWidgetIds)}>Delete Selected</button>
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Color</th>
          <th>Size</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {widgets.map(
          widget => widget.id === editWidgetId
            ? <WidgetEditRow
              key={widget.id} widget={widget} widgetSelected={selectedWidgetIds.includes(widget.id)}
              onSaveWidget={onSaveWidget} onCancelWidget={onCancelWidget} onSelectWidget={selectWidget} />
            : <WidgetViewRow
              key={widget.id} widget={widget} widgetSelected={selectedWidgetIds.includes(widget.id)}
              onDeleteWidget={onDeleteWidget} onEditWidget={onEditWidget} onSelectWidget={selectWidget} />
        )}
      </tbody>
    </table>
  </React.Fragment>;
};

WidgetTable.propTypes = {
  widgets: PropTypes.array.isRequired,
  editWidgetId: PropTypes.string.isRequired,
  selectedWidgetIds: PropTypes.array.isRequired,
  onDeleteWidget: PropTypes.func.isRequired,
  onEditWidget: PropTypes.func.isRequired,
  onSaveWidget: PropTypes.func.isRequired,
  onCancelWidget: PropTypes.func.isRequired,
  onDeleteSelectedWidgets: PropTypes.func.isRequired,
  onAddSelectedWidgetId: PropTypes.func.isRequired,
  onRemoveSelectedWidgetId: PropTypes.func.isRequired,
};
