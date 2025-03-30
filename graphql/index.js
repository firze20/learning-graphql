import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";

// Load all .graphql and .resolver.js files from subdirectories
const typeDefsArray = loadFilesSync('./graphql/schemas/**/*.graphql');
const resolversArray = loadFilesSync('./graphql/resolvers/**/*.resolver.js');

// Merge into a single schema + resolvers
export const typeDefs = mergeTypeDefs(typeDefsArray);
export const resolvers = mergeResolvers(resolversArray);

