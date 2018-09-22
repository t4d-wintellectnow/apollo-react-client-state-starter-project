import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { WidgetTable, WidgetForm, SubscriptionInfoNotification } from './components';

const APP_QUERY = gql`
  query App {
    widgets {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;

const INSERT_WIDGET_MUTATION = gql`
  mutation InsertWidget($widget: InsertWidget) {
    insertWidget(widget: $widget) {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;

const DELETE_WIDGET_MUTATION = gql`
  mutation DeleteWidget($widgetId: ID) {
    deleteWidget(widgetId: $widgetId) {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;

const WIDGET_INSERTED_SUBSCRIPTION = gql`
  subscription WidgetInserted {
    widgetInserted {
      id
      name
    }
  }
`;

const WIDGET_DELETED_SUBSCRIPTION = gql`
  subscription WidgetDeleted {
    widgetDeleted {
      id
      name
    }
  }
`;


export class App extends React.Component {

  render() {
    return <React.Fragment>
      <section id="notifications">
        <SubscriptionInfoNotification subscription={WIDGET_INSERTED_SUBSCRIPTION} refetchQueries={[{ query: APP_QUERY }]}>
          {({ widgetInserted: { name } }) => <span>A widget named {name} was inserted!</span>}
        </SubscriptionInfoNotification>
        <SubscriptionInfoNotification subscription={WIDGET_DELETED_SUBSCRIPTION} refetchQueries={[{ query: APP_QUERY }]}>
          {({ widgetDeleted: { name } }) => <span>A widget named {name} was deleted!</span>}
        </SubscriptionInfoNotification>
      </section>
      <Query query={APP_QUERY}>
        {({ loading, error, data }) => {

          if (loading) return 'Loading...';
          if (error) return 'Error...';

          return <Mutation mutation={DELETE_WIDGET_MUTATION}>
            {mutateDeleteWidget => {

              const deleteWidget = widgetId => {
                return mutateDeleteWidget({
                  variables: { widgetId },
                  refetchQueries: () => ([
                    { query: APP_QUERY },
                  ]),
                });
              };

              return <WidgetTable widgets={data.widgets} onDeleteWidget={deleteWidget} />;
            }}
          </Mutation>;
        }}
      </Query>
      <Mutation mutation={INSERT_WIDGET_MUTATION}>
        {mutateInsertWidget => {

          const insertWidget = widget => {

            return mutateInsertWidget({
              variables: { widget },
              refetchQueries: () => ([
                { query: APP_QUERY },
              ]),
            });
          };

          return <WidgetForm buttonText="Add Widget" onSubmitWidget={insertWidget} />;
        }}
      </Mutation>
    </React.Fragment>;
  }
}
