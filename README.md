# GraphQL Guide

This repo is for following GraphQL guide book

## Pre-requisites

- **Docker Desktop** installed
- Docker extensions in VS Code to open Development Container
- **Mongodb** Compass (Optional)
- Create database called **guide** in mongodb.
  - Create collection called **Users**
    - Insert JSON data in the collection.

**JSON Data To Insert In Collection Example:**

```json
[
  {
    "_id": "1",
    "username": "user1"
  },
  {
    "_id": "2",
    "username": "user2"
  },
  {
    "_id": "3",
    "username": "Shrek"
  },
  {
    "_id": "4",
    "username": "Batman"
  },
  {
    "_id": "5",
    "username": "Pikachu"
  }
]
```

![mongodb Compass Image](mongodb-compass.png)

## Express Server

Open `http://localhost:4000/graphql` 🚀 it will open **Apollo Server**

__Demo:__

https://github.com/user-attachments/assets/c81d0252-119e-40c1-b575-6503be838caa


# Chapter 1 Async Data Loading

1 - Create a new collection called `groups`, like this:

![Groups Collection](groups-collection.png)

After assign all users to a specific group, by creating a field called `groupId`. 

![Users Collection](users-collection.png)

__In this chapter I switched to Apollo Server__

![Apollo Server](apollo-server.png)

# Chapter 2 Multiple types of data

```graphql
query ExampleQuery($groupId: String!, $userId: String) {
  users {
    _id
    username
    group {
      _id
      name
    }
  }
  groups {
    _id
    name
  }
  group(id: "author") {
    _id
    name
  }
  user(id: "4") {
    _id
    username
    group {
      name
    }
  }
}
```

Response:
```json
{
  "data": {
    "users": [
      {
        "_id": "1",
        "username": "user1",
        "group": {
          "_id": "dev",
          "name": "Developers"
        }
      },
      {
        "_id": "2",
        "username": "user2",
        "group": {
          "_id": "dev",
          "name": "Developers"
        }
      },
      {
        "_id": "3",
        "username": "Shrek",
        "group": {
          "_id": "dev",
          "name": "Developers"
        }
      },
      {
        "_id": "4",
        "username": "Batman",
        "group": {
          "_id": "dev",
          "name": "Developers"
        }
      },
      {
        "_id": "5",
        "username": "Pikachu",
        "group": {
          "_id": "dev",
          "name": "Developers"
        }
      }
    ],
    "groups": [
      {
        "_id": "author",
        "name": "Authors"
      },
      {
        "_id": "dev",
        "name": "Developers"
      }
    ],
    "group": {
      "_id": "author",
      "name": "Authors"
    },
    "user": {
      "_id": "4",
      "username": "Batman",
      "group": {
        "name": "Developers"
      }
    }
  }
}
```

# Chapter 3: Query Language

- [Operations](#operations)
- [Document](#document)
- [Selection sets](#selection-sets)
- [Fields](#fields)
- [Arguments](#arguments)
- [Variables](#variables)
- [Field aliases](#field-aliases)
- [Fragments](#fragments)
  - [Named Fragments](#named-fragments) 
    - [Type conditions](#type-conditions)
  - [Inline fragments](#inline-fragments)
- [Directives](#directives)
  - [`@skip`](#skip)
  - [`@include`](#include)
  - [`@deprecated`](#deprecated)
- [Mutations](#mutations)
- [Subscriptions](#subscriptions)
- [Summary](#summary) 

## Operations

__Operations__
GraphQL is a specification for communicating with the server. We communicate with it—asking for data and telling it to do things—by sending _[operations](https://spec.graphql.org/draft/#sec-Language.Operations)_. There are three types of operations:
- `query` fetches data
- `mutation` changes and fetches data
- `subscription` tells the server to send data whenever a certain event occurs

__Operations__ can have names, like __AllTheStars__ in this query operation:
```graphql
query AllTheStars {
  githubStars
}
```

## Document

Similar to how we call a `JSON` file or `string` a `JSON` document, a GraphQL file or string is called a GraphQL _[document](https://spec.graphql.org/draft/)_. There are two types of GraphQL documents—executable documents and schema documents. In this chapter, we’ll mainly be discussing executable documents. An executable document is a list of one or more operations or [fragments](#fragments). Here’s a document with a query operation:
```graphql
query {
  githubStars
}
```

Our operation has a single root field, __githubStars__. In this type of document—a single query operation without [variables]() or [directives](#directives)—we can omit query, so the above document is equivalent to:

```graphql
{
  githubStars
}
```

A more complex document could be:

```graphql
query StarsAndChapter {
  githubStars
  chapter(id: 0) {
    title
  }
}

mutation ViewedSectionOne {
  viewedSection(id: "0-1") {
    ...sectionData
  }
}

mutation ViewedSectionTwo {
  viewedSection(id: "0-2") {
    ...sectionData
  }
}

fragment sectionData on Section {
  id
  title
}

subscription StarsSubscription {
  githubStars
}
```

It has all the operation types as well as a fragment. __Note__ that when we have more than one __operation__, we need to give each a name—in this case, __StarsAndChapter__, __ViewedSection__, and __StarsSubscription__.”

## Selection sets

The content between a pair of curly braces is called a [selection set](https://spec.graphql.org/draft/#sec-Selection-Sets)—the list of data fields we’re requesting. For instance, the __StarsAndChapter__ selection set lists the __githubStars__ and __chapter__ fields:

```graphql
{
  githubStars
  chapter(id: 0) {
    title
  }
}
```

And chapter has its own selection set: `{ title }`.

## Fields

A [field](https://spec.graphql.org/draft/) is a piece of information that can be requested in a selection set. In the above query, `githubStars`, `chapter`, and `title` are all fields. The first two are top-level fields (in the outer selection set, at the first level of indentation), and they’re called root query fields. Similarly, viewedSection in the document below is a root mutation field:
```graphql
mutation ViewedSectionTwo {
  viewedSection(id: "0-2") {
    ...sectionData
  }
}
```

## Arguments

On the server, a field is like a function that returns a value. Fields can have _[arguments](https://spec.graphql.org/draft/#sec-Language.Arguments)_: named values that are provided to the field function and change how it behaves. In this example, the `user` field has an `id` argument, and `profilePic` has `width` and `height` arguments:
```graphql
{
  user(id: 1) {
    name
    profilePic(width: 100, height: 50)
  }
}
```

Arguments can appear in any order.

## Variables

We often don’t know argument values until our code is being run—for instance, we won’t always want to query for user #1. The user ID we want will depend on which profile page we’re displaying. While we could edit the document at runtime (like `{ user(id: ' + currentPageUserId + ') { name }}'`), we recommend instead using static strings and _[variables](https://spec.graphql.org/draft/#sec-Language.Variables)_. __Variables__ are declared in the document, and their values are provided separately, like this:
```graphql
query UserName($id: Int!) { 
  user(id: $id) {
    name
  }
}

{
  "id": 2
}
```

After the operation name, we declare `($id: Int!)`: the name of the variable with a `$` and the type of the __variable__. `Int` is an `integer` and `!` means non-null (required). Then, we use the variable name `$id` in an argument in place of the value: `user(id: 2) => user(id: $id)`. Finally, we send a __JSON__ object with variable values along with the query document.
We can also give variables default values, for instance:
```graphql
query UserName($id: Int = 1) { 
  user(id: $id) {
    name
  }
}
```

If `$id` isn’t provided, `1` will be used.

## Field aliases

We can give a field an _[alias](https://spec.graphql.org/draft/#sec-Field-Alias)_ to change its name in the response object. In this query, we want to select `profilePic` twice, so we give the second instance an alias:

```graphql
{
  user(id: 1) {
    id
    name
    profilePic(width: 400)
    thumbnail: profilePic(width: 50)
  }
}
```
The response object is:

```graphql
{
  "user": {
    "id": 1,
    "name": "John Resig",
    "profilePic": "https://cdn.site.io/john-400.jpg",
    "thumbnail": "https://cdn.site.io/john-50.jpg"
  }
}
```

## Fragments

- [Named fragments](#named-fragments)
  - [Type conditions](#type-conditions)
- [Inline fragments](#inline-fragments)

### Named Fragments

_[Fragments](https://spec.graphql.org/draft/)_ group together fields for reuse. Instead of this:

```graphql
{
  user(id: 1) {
    friends {
      id
      name
      profilePic
    }
    mutualFriends {
      id
      name
      profilePic
    }
  }
}
```

we can combine fields with a fragment that we name `userFields`:

```graphql
query {
  user(id: 1) {
    friends {
      ...userFields
    }
    mutualFriends {
      ...userFields
    }
  }
}

fragment userFields on User {
  id
  name
  profilePic
}
```

#### Type conditions

Fragments are defined on a type. The type can be an _[object]()_, _[interface]()_, or _[union]()_. When we’re selecting fields from an interface or union, we can conditionally select certain fields based on which object type the result winds up being. We do this with fragments. For instance, if the `user` field had type `User`, and `User` was an interface implemented by `ActiveUser` and `SuspendedUser`, then our query could be:

```graphql
query {
  user(id: 1) {
    id
    name
    ...activeFields
    ...suspendedFields
  }
}

fragment activeFields on ActiveUser {
  profilePic
  isOnline
}

fragment suspendedFields on SuspendedUser {
  suspensionReason
  reactivateOn
}
```

Then, the server will use the fragment that fits the type returned. If an `ActiveUser` object is returned for user 1, the client will receive the `profilePic` and `isOnline` fields.

### Inline Fragments

[Inline fragments](https://spec.graphql.org/draft/#sec-Inline-Fragments) don’t have a name and are defined inline—inside the selection set, like this:

```graphql
query {
  user(id: 1) {
    id
    name
    ... on ActiveUser {
      profilePic
      isOnline
    }
    ... on SuspendedUser {
      suspensionReason
      reactivateOn
    }
  }
}
```

## Directives

[Directives](https://spec.graphql.org/draft/#sec-Language.Directives) can be added after various parts of a document to change how that part is [validated or executed]() by the server. They begin with an `@` symbol and can have arguments. There are three included directives, `@skip`, `@include`, and `@deprecated`, and servers can define custom directives.

### `@skip`

`@skip(if: Boolean!)` is applied to a field or fragment spread. The server will omit the field/spread from the response when the `if` argument is true.

```graphql
query UserDeets($id: Int!, $textOnly: Boolean!) {
  user(id: $id) {
    id
    name
    profilePic @skip(if: $textOnly)
  }
}
```

```json
{
  "id": 1,
  "textOnly": true
}
```

Sending the above document and variables would result in the below response:
```json
{
  "data":  {
    "user": {
      "id": 1,
      "name": "John Resig"
    }
  }
}
```

While the spec doesn't dictate using JSON to format responses, it is the most common format.

### `@include`

`@include(if: Boolean!)` is the opposite of `@skip`, only including the field/spread in the response when `if` argument is true.

```graphql
query UserDeets($id: Int!, $adminMode: Boolean!) {
  user(id: $id) {
    id
    name
    email @include(if: $adminMode)
    groups @include(if: $adminMode)
  }
}
```

```json
{
  "id": 1,
  "adminMode": false
}
```

Sending the above document and variables would result in the below response:

```graphql
{
  "data":  {
    "user": {
      "id": 1,
      "name": "John Resig"
    }
  }
}
```

### `@deprecated`

Unlike `@skip` and `@include`, which are used in executable documents, [`@deprecated`](https://spec.graphql.org/draft/#sec--deprecated) is used in schema documents. It is placed after a field definition or enum value to communicate that the field/value is deprecated and why—it has an optional `reason` String argument that defaults to “No longer supported.

```graphql
type User {
  id: Int!
  name: String
  fullName: String @deprecated("Use `name` instead")
}
```

## Mutations

[Mutations](https://spec.graphql.org/draft/#sec-Mutation), unlike queries, have side effects—i.e., alter data. The REST equivalent of a query is a `GET` request, whereas the equivalent of a mutation is a `POST`, `PUT`, `DELETE`, or `PATCH`. Often, when the client sends a mutation, it selects the data that will be altered so that it can update the client-side state.

```graphql
mutation {
  upvotePost(id: 1) {
    id
    upvotes
  }
}
```

In this example, the `upvotes` field will change, so the client selects it (i.e., includes it in the selection set).
While not enforced by the specification, the intention and convention is that only root mutation fields like upvotePost alter data—not subfields like `id` or `upvotes`, and not Query or Subscription fields.

We can include multiple root fields in a mutation, but they are executed in series, not in parallel. (All fields in a mutation below the top level and all query fields are executed in parallel.) This way, assuming the code resolving the first root mutation field waits for all of the side effects to complete before returning, we can trust that the second root mutation field is operating on the altered data. If the client wants the root fields to be executed in parallel, they can be sent in separate operations.

While technically “mutation” is an operation type, the root mutation fields are often called “mutations.

## Subscriptions

[Subscriptions](https://spec.graphql.org/draft/#sec-Subscription) are long-lived requests in which the server sends the client data from events as they happen. The manner in which the data is sent is not specified, but the most common implementation is WebSockets, and other implementations include HTTP long polling, server-sent events (supported by all browsers except for IE 11), and webhooks (when the client is another publicly-addressable server).

The client initiates a subscription with:

```graphql
subscription {
  reviewCreated {
    id
    text
    createdAt
    author {
      name
      photo
    }
  }
}
```

As with mutations, we call the subscription operation’s root field the “subscription,” and its selection set is the data that the server sends the client on each event. In this example, the event is the creation of a review. So whenever a new review is created, the server sends the client data like this:
```json
{
  "data": {
    "reviewCreated": {
      "id": 1,
      "text": "Now that’s a downtown job!",
      "createdAt": 1548448555245,
      "author": {
        "name": "Loren",
        "photo": "https://avatars2.githubusercontent.com/u/251288"
      }
    }
  }
}
```

## Summary 

To recap the GraphQL query language, we can send one or more operations in a GraphQL document. Each operation has a (possibly nested) `selection set`, which is a set of `fields`, each of which may have `arguments`. We can also:
- Declare [variables](#variables) after the operation name.
- [Alias](#field-aliases) fields to give them different names in the response object.
- Create [name fragments](#named-fragments) to reuse fields and add [type conditions](#type-conditions) to conditionally select fields from interfaces and unions.
- Add [directives](#directives) to modify how the server handles a part of a document.
- Use [mutations](#mutations) to alter data.
- Use [subscriptions](#subscriptions) to receive events from the server.

# Chapter 3: Type System

Chapter contents:
- [Schema](#schema)
- [Types](#types)
- [Descriptions](#descriptions)
- [Scalars](#scalars)
- [Enums](#enums)
- [Objects](#objects)
- [Interfaces](#interfaces)
- [Unions](#unions)
- [Lists](#lists)
- [Non-null](#non-null)
- [Field arguments](#field-arguments)
  - [Input objects](#input-objects)
- [Directives](#directives)
- [Extending](#extending)
- [Introspection](#introspection)
- [Summary](#summary)

# Schema

The [schema](https://spec.graphql.org/draft/#sec-Schema) defines the capabilities of a GraphQL server. It defines the possible queries, mutations, subscriptions, and additional types and directives. While the schema can be written in a programming language, it is often written in SDL (the GraphQL Schema Definition Language). Here is the most basic schema, written in SDL:

```graphql
schema {
  query: Query
}

type Query {
  hello: String
}
```

It has a single root query field, `hello`, of type String(when we send a `hello` query, the server will return a string value). We can omit the `schema` declaration when we use operation types named `Query`, `Mutation`, and `Subcription`, so the above is equivalent to:

```graphql
type Query {
  hello: String
}
```

With this schema, the client can make the below query:
```graphql
query {
  hello
}
```

and receive this response:

```json
{
  "data": {
    "hello": "world!"
  }
}
```

The root fields-those listed under `type Query {...}`, `type Mutation { ... }`, and `type Subscription { ... }` are the entry points to our schema-the fields that can be selected by the client at the root level of an operation.

# Types

There are six named types and two wrapping types. The named types are:

- Scalar
- Enum
- Object
- Input object
- Interface
- Union 

If you think of a GraphQL query as a tree, starting at the root field and branching out, the leaves are either scalars or enums. They're the fields without selection sets of their own.

The two wrapping types are:

- List
- Non-null

When the named types appear by themselves, they are singular and nullable--i.e., when the client requests a field, the server will return either one item or `null`. These two wrapping types change this default behavior.

# Descriptions

We can add a [description](https://spec.graphql.org/draft/#sec-Descriptions) before any definition in our schema using `#`, `"`. or `"""`. Descriptions are included in [introspection](#introspection) and displayed by tools like GraphiQL.

```graphql
type Query {
  # have the server say hello to whomever you want!
  hello(
    "person to say hello to"
    name: String!
  ): String
}

"""
multiline comment
describing
the User type
"""

type User {
  id: Int
  email: String 
}
```

# Scalars

[Scalars](https://graphql.org/learn/schema/#scalar-types) are primitive values. There are five included scalar types:

- `Int`: Signed 32-bit non-fractional number. Maximum value around 2 billion (2,147,483,647)
- `Float`: Signed [double-precision](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) (64-bit) fractional value.
- `String`: Sequence of [UTF-8](https://en.wikipedia.org/wiki/UTF-8) (8-bit Unicode) characters.
- `Boolean`: `true` or `false`.
- `ID`: Unique identifier, serialized as string.

We can also define our own scalars, like `Url` and `DateTime`. In the description of our custom scalars, we write how they're serialized so the frontend developer knows what value to provide for arguments. For instance, `DateTime` could be serialized as an integer (miliseconds since Epoch) or as an ISO string:

```graphql
# schema

type Mutation {
  dayOfTheWeek(when: DateTime): String
}
```

```graphql
# if DateTime is serialized as an integer
mutation {
  dayOfTheWeek(when: 1591028749941)
}

# if DateTime is serialized as an ISO string
mutation {
  dayOfTheWeek(when: "2020-06-01T16:25:49.941Z")
}
```

The benefits to using custom scalars are clarity(`when: DateTime` is clearer than `when: Int`) and consisten validation (whatever value we pass is checked to make sure it's a valid DateTime).

# Enums

When a scalar field has a small set of possible values, it's best to use an enum insteand. The enum type declaration lists all the options:

```graphql
enum Direction {
  NORTH
  EAST
  SOUTH
  WEST
}
```

Enums are usually serialized as strings (for example, `"NORTH"`). Here's an example Query type, query operation, and response:

```graphql
type Query {
  currentHeading(flightId: ID): Direction
}
```

```graphql
query {
  currentHeading(flightId: "abc")
}
```

response: 

```json
{
  "data": {
    "currentHeading": "NORTH"
  }
}
```

# Objects

An object is a list of fields, each of which have a name and a type. The below schema defines two object types, `Post` and `User`:

```graphql
type Post {
  id: ID
  text: String
  author: User
}

type User {
  id: ID
  name: String
}
```

A field's type can be anything but an input object. In the `Post` type, the `id` and `text` fields are scalars, while `author` is an object type.

When selecting a field that has an object type, at least one of that object's fields must be selected. For instance, in the below schema, `post` field is of type `Post`:

```graphql
type Query {
  post(id: ID): Post
}
```

Since `Post` is an object type, at least one `Post` field must be selected in query A below--in this case, `text`. And in query B, `post.author` is of type `User`, so at least one `User` field must be selected.

```graphql
query A {
  post(id: "abc") {
    text
  }
}

query B {
  post(id: "abc") {
    author {
      name
    }
  }
}

In other words, we have to keep adding selection sets until we only have leaves (scalars and enums) left. Objects are the branches on the way to the leaves.
```

# Interfaces

[Interfaces](https://graphql.org/learn/schema/#interfaces) define a list of fields that must be included in any object types implementing them. For instance, here are two interfaces, `BankAccount` and `InsuredAccount`, and and an object type that implements them, `CheckingAccount`:

```graphql
interface BankAccount {
  accountNumber: String!
}

interface InsuredAccount {
  insuranceName: String
  insuranceAmount: Int!
}

type CheckingAccount implements BankAccount & InsuredAccount {
  accountNumber: String!
  insuranceName: String
  insuranceAmount: Int!
  routingNumber: String!
}
```

Since `CheckingAccount` implements both interfaces, it must include the fields from both. It can also include additional fields, like `routingNumber`.

Interfaces can implement other interfaces, like this:

```graphql
interface InvestmentAccount implements BankAccount {
  accountNumber: String!
  marginApproved: Boolean!
}

type RetirementAccount implements InvestmentAccount {
  accountNumber: String!
  marginApproved: Boolean!
  contributionLimit: Int!
}
```

Interfaces are helpful for clarity and consistency in the schema, but they're also useful as field types:

```graphql
type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  accounts: [BankAccount]
}
```

We can now query for fields in `BankAccount`

```graphql
query {
  user(id: "abc") {
    name
    accounts {
      accountNumber: String!
    }
  }
}
```

And if we want to query fields outside `BankAccount`, we can use a fragment:

```graphql
query {
  user(id: "abc") {
    name
    accounts {
      accountNumber: String!
      ... on RetirementAccount {
        marginaApproved
        contributionLimit
      }
    }
  }
}
```

# Unions

A [union](https://spec.graphql.org/draft/#sec-Unions) type is defined as a list of object types:

```graphql
union SearchResult = User | Post

type User {
  name: String
  profilePic: Url
}

type Post {
  text: String
  upvotes: Int
}
```

When a field is typed as a union, its value can be any of the objects listed in the union definition. So the below `search` query returns a list of `User` and `Post` objects.

```graphql
type Query {
  search(term: String): SearchResult
}
```

```graphql
query {
  search(term: "John") {
    ... on User {
      name
    }
    ... on Post {
      text
    }
  }
}
```

Since unions don't guarantee any fields in common, any field we select has to be inside a fragment (which have a specific object type).

# Lists

[List](https://spec.graphql.org/draft/) is wrapper type. It wraps another type and signifies an ordered list in which each item is of the wrapped type.

```graphql
type User {
  names: [String]
}
```

The `User.names` field could be any of these values:

```graphql
null
[]
[null]
["Loren"]
["Loren", null, "L", "Lolo"]
```

We can also nest lists, like `Spreadsheet.cells`:

```graphql
type Spreadsheet {
  columns: [String]
  rows: [String]
  cells: [[Int]]
}
```

For example:

```json
{
  "columns": ["Revenue", "Expenses"],
  "rows": ["Jan", "Feb", "March"],
  "cells": [[100, 110], [200, 100], [300, 50]]
}
```

# Non-null

[Non-null](https://graphql.org/learn/schema/#lists-and-non-null) is a wrapper type. It wraps any other type and signifies that type can't be null.

```graphql
type User {
  name: String!
}
```

If we select `User.name` in a query:

```graphql
query {
  user(id: "abc") {
    name
  }
}
```

then we will never get this response:

```json
{
  "data": {
    "user": {
      "name": null
    }
  }
}
```

These two responses are valid:

```json
{
  "data": {
    "user": {
      "name": "Loren"
    }
  }
}
```

```json
{
  "data": {
    "user": {
      "name": null
    }
  }
}
```

# Field arguments

Any field can accept a named, unordered list of [arguments]. Arguments can be scalars, enums, or input objects. An argument can be non-null to indicate it is required. Optional arguments can have a default value, like `name` below.

```graphql
type User {
  # no arguments
  name

  # an optional scalar argument with a default value
  profilePic(width: Int = 100): Url
}

type Mutation {
  # a non-null enum argument
  pokemonGo(direction: Direction!): Boolean

  # three non-null scalar arguments
  createPost(authorId: ID!, title: Sring!, body: String!): Post
}
```

## Input objects

[Input objects](https://spec.graphql.org/draft/#sec-Input-Objects) are objects that are only used as arguments. An input object is often the sole argument to mutations.

An input object is a list of input fields--scalars, enums, and other input objects.

```graphql
type Mutation {
  createPost(input: CreatePostInput!): Post
}

input CreatePostInput {
  authorId: ID!
  title: String = "Untitled"
  body: String!
}
```

Note that:
- Input objects fields can have default values.
- The declaration keyword is `input`, not the `type` keyword that is used for output objects.





# Directives

# Extending

# Introspection

# Summary







