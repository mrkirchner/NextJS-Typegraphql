import "reflect-metadata";
import {buildSchema} from "type-graphql";
import UserResolver from "../../graphql/userResolver";
import {ApolloServer} from "apollo-server-micro";

let server: ApolloServer;
const init = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  server = new ApolloServer({
    schema,
  });
  await server.start();
}


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

  await init();
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}