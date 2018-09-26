import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';

const WIDGET_INSERTED = 'widgetInserted';
const WIDGET_DELETED = 'widgetDeleted';
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    message: () => 'Hello World!',
    widgets: (_1, _2, { restURL }) =>
      fetch(`${restURL}/widgets`)
        .then(res => res.json()),
  },
  Mutation: {
    insertWidget: (_, { widget }, { restURL }) =>
      fetch(`${restURL}/widgets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
      })
        .then(res => res.json())
        .then(widget => {
          pubsub.publish(WIDGET_INSERTED, { widgetInserted: widget });
          return widget;
        }),
    replaceWidget: (_, { widget }, { restURL }) =>
      fetch(`${restURL}/widgets/${encodeURIComponent(widget.id)}`)
        .then(res => res.json())
        .then(oldWidget =>
          fetch(`${restURL}/widgets/${encodeURIComponent(widget.id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(widget)
          })
            .then(() => oldWidget)),
    deleteWidget: (_, { widgetId }, { restURL }) =>
      fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`)
        .then(res => res.json())
        .then(widget => {
          return fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`, { method: 'DELETE' })
            .then(() => widget);
        })
        .then(widget => {
          pubsub.publish(WIDGET_DELETED, { widgetDeleted: widget });
          return widget;
        }),
    deleteWidgets: (_, { widgetIds }, { restURL }) =>
      Promise.all(
        widgetIds.map(widgetId =>
          fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`)
            .then(res => res.json())
            .then(widget => {
              return fetch(`${restURL}/widgets/${encodeURIComponent(widgetId)}`, { method: 'DELETE' })
                .then(() => widget);
            })
            .then(widget => {
              pubsub.publish(WIDGET_DELETED, { widgetDeleted: widget });
              return widget;
            })
        )
      ),
  },
  Subscription: {
    widgetInserted: {
      subscribe: () => pubsub.asyncIterator(WIDGET_INSERTED),
    },
    widgetDeleted: {
      subscribe: () => pubsub.asyncIterator(WIDGET_DELETED),
    },
  },
};
