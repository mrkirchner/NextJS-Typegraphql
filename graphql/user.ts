import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

export { User}
