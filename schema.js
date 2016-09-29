var graphql = require ('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType
var GraphQLInt = graphql.GraphQLInt
var GraphQLBoolean = graphql.GraphQLBoolean
var GraphQLString = graphql.GraphQLString
var GraphQLList = graphql.GraphQLList
var GraphQLNonNull = graphql.GraphQLNonNull
var GraphQLObjectType = graphql.GraphQLSchema

// Random data
var USERS = [
  {
    'id': 1,
    'pseudo': 'Sanglou',
    'emailValide': true
  },
  {
    'id': 2,
    'pseudo': 'Sangli',
    'emailValide': false
  }
];

var UserType = new graphql.GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'User id'
    },
    pseudo: {
      type: GraphQLString,
      description: 'User pseudo'
    },
    emailValide: {
      type: GraphQLBoolean,
      description: 'User email valide'
    }
  })
});

var QueryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new graphql.GraphQLList(UserType),
      resolve: () => USERS
    }
  })
});

var MutationAdd = {
  type: new graphql.GraphQLList(UserType),
  description: 'Add a User',
  args: {
    pseudo: {
      name: 'User pseudo',
      type: new graphql.GraphQLNonNull(GraphQLString)
    },
    id: {
      name: 'User id',
      type: new graphql.GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, args) => {
    USERS.push({
      id: args.id,
      pseudo: args.pseudo,
      emailValide: false
    });
    return USERS;
  }
};

var MutationToggle = {
  type: new graphql.GraphQLList(UserType),
  description: 'Validate User Email',
  args: {
    id: {
      name: 'User id',
      type: new graphql.GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, args) => {
    USERS
      .filter((user) => user.id === args.id)
      .forEach((user) => user.emailValide = !user.emailValide)
    return USERS;
  }
};

var MutationDelete = {
  type: new graphql.GraphQLList(UserType),
  description: 'Delete user',
  args: {
    id: {
      name: 'User Id',
      type: new graphql.GraphQLNonNull(GraphQLInt)
    }
  },
  resolve: (root, args) => {
    return USERS = USERS.filter((user) => user.id !== args.id);
  }
};

var MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    toggle: MutationToggle,
    delete: MutationDelete
  }
});


module.exports = new graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});
