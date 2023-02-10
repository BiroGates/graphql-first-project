import { ApolloServer, gql } from 'apollo-server';
import { randomUUID } from 'node:crypto';



const typeDefs = gql`
    # Normal Types
    type User {
        id: String!,
        name: String!
    }

    type UserContactInfo {
        id: String!
        user_id: String!
        phone: String!,
        email: String!,
        zipCode: String!
    }


    # Special Types (endpoints) 
    type Query {
        Users: [User!]!
        UserContactInfo: [UserContactInfo!]! 
    } 

    type Mutation{
        createUser(name: String!): User!
        createUserContact(user_id: String, phone: String, email: String, zipCode: String): UserContactInfo
    }
`

interface User {
    id: string,
    name: string
}

interface UserContactInfo {
    id: string
    user_id: string
    phone: string,
    email: string,
    zipCode: string
}

const users : User[] = [];
const userContactInfo: UserContactInfo[] = [];


const server = new ApolloServer({
    typeDefs, 
    resolvers: {
        Query: {
            Users: () => {
                return users;
            },

            UserContactInfo: () => {
                return userContactInfo;
            }
        },

        Mutation: {
            createUser: (parents, args) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                };

                users.push(user);
                return user;
            },

            createUserContact: (parents, args) => {
                const info = {
                    id: randomUUID(),
                    user_id: args.user_id,
                    phone: args.phone,
                    email: args.email,
                    zipCode: args.zipCode
                };

                userContactInfo.push(info);

                return info;
            }
        }

    }
});


server.listen().then(({ url }) => {
    console.log('Server is running in: ' + url);
});