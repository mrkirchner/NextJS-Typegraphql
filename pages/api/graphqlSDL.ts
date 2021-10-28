import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    usersdl: User
  }
  type User {
    id: ID!
    title: String
    description: String
  }
`

const resolvers = {
  Query: {
    usersdl() {
      return { id: '1', title: 'SDL' }
    },
  },
  User: {
    description() {
      return 'SDL Description'
    }
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
const startServer = apolloServer.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphqlSDL',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}