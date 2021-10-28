import {Arg, FieldResolver, Query, Resolver} from "type-graphql";
import {User} from "./user";

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  async user() {
    return {
      id: 2,
      title: 'TYPE'
    }
  }

  @FieldResolver(() => String)
  description() {
    console.log('Client')
    return 'Type Description';
  }
}

export default UserResolver