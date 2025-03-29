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



## Variables

## Field aliases

## Fragments

### Named Fragments

#### Type conditions

### Inline Fragments

## Directives

### `@skip`

### `@include`

### `@deprecated`

## Mutations

## Subscriptions

## Summary 










