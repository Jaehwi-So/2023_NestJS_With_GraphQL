import { ApolloServer, gql } from 'apollo-server'
//yarn add applo-server graphql

// The GraphQL schema


//hello 요청 시 String이 반환됨
//
const typeDefs = gql`
  type Query { 
    "A simple type for getting started!"
    hello: String   
    fetchBoardsCount: Int!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => {
        return 'world'
    },
  },
};

const server = new ApolloServer({
  typeDefs : typeDefs,
  resolvers : resolvers,
});

server.listen(3001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});