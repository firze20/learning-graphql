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

Open `http://localhost:4000` it will open **GraphiQL Ruru Server**

__Demo:__

https://github.com/user-attachments/assets/c81d0252-119e-40c1-b575-6503be838caa


# Chapter 1 Async Data Loading

1 - Create a new collection called `groups`, like this:

![Groups Collection](groups-collection.png)

After assign all users to a specific group, by creating a field called `groupId`. 

![Users Collection](users-collection.png)




