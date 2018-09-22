import React from 'react';
import { Subscription, ApolloConsumer } from 'react-apollo';

import { InfoNotification } from './InfoNotification';

export const SubscriptionInfoNotification = ({ subscription, refetchQueries, children, ...props }) =>
  <Subscription subscription={subscription}>
    {({ data, loading, error }) => {

      if (error) {
        console.error(error);
        return null;
      }

      if (!loading) {
        return <ApolloConsumer>
          {client => {

            refetchQueries.map(refetchQuery => client.query({
              fetchPolicy: 'network-only',
              ...refetchQuery,
            }));

            return <InfoNotification {...props}>
              {children(data)}
            </InfoNotification>;
          }}
        </ApolloConsumer>;
      }

      return null;
    }}
  </Subscription>;
