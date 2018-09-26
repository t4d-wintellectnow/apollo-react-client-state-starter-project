export const typeDefs = `
  type Query {
    message: String
    widgets: [Widget]
  }

  type Mutation {
    insertWidget(widget: InsertWidget): Widget
    replaceWidget(widget: ReplaceWidget): Widget
    deleteWidget(widgetId: ID): Widget
    deleteWidgets(widgetIds: [ID]): [Widget]
  }

  type Subscription {
    widgetInserted: Widget
    widgetDeleted: Widget
  }

  type Widget {
    id: ID
    name: String
    description: String
    color: String
    size: String
    price: Float
    quantity: Int
  }

  input InsertWidget {
    name: String
    description: String
    color: String
    size: String
    price: Float
    quantity: Int
  }

  input ReplaceWidget {
    id: ID
    name: String
    description: String
    color: String
    size: String
    price: Float
    quantity: Int
  }  
`;
