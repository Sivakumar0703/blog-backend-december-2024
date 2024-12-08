# Blog Project

 ## Overview 
 This project is a blog platform that allows users to create, read, update, and delete blog posts. It also supports user authentication, tagging, commenting, and liking posts. Additionally, it provides various endpoints to manage users, posts, comments, and likes. 

 ## Features 
 - User registration and authentication 
 - Create, read, update, and delete posts 
 - Search posts by text and tags 
 - Add and remove tags from posts 
 - Comment on posts 
 - Like and unlike


# User Management API 

## Overview 
This document provides details on the endpoints available for managing users in the system. These endpoints allow you to get user details, register new users, log in, update user information, and delete

## API Endpoints

### 1. Get All Users
- **Endpoint**: `/api/users/get_all_user`
- **Method**: `GET`
- **Description**: Fetches details of all users.

### 2. Register
- **Endpoint**: `/api/users/register_user`
- **Method**: `POST`
- **Request Body**:
  - `name` (string): User's name.
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Description**: Registers a new user.

### 3. Login
- **Endpoint**: `/api/users/login_user`
- **Method**: `POST`
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Description**: Logs in a user and returns a JWT token.

### 4. Update User
- **Endpoint**: `/api/users/update_user`
- **Method**: `PATCH`
- **Request Body**:
  - `name` (string): User's name.
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Updates the details of an existing user.

### 5. Delete User
- **Endpoint**: `/api/users/delete_user`
- **Method**: `DELETE`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Deletes a user by ID.

# Post Management API

## Overview
This document provides details on the endpoints available for managing blog posts in the system. These endpoints allow you to create, read, update, and delete posts, as well as search and tag posts.

## API Endpoints

### 1. Create and Save Post
- **Endpoint**: `/api/posts/save_post`
- **Method**: `POST`
- **Request Body**:
  - `title` (string): Post title.
  - `content` (string): Post content.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Creates a new blog post.

### 2. Get Posts Written by User
- **Endpoint**: `/api/posts/get_my_posts`
- **Method**: `GET`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Fetches posts written by the authenticated user.

### 3. Edit Post
- **Endpoint**: `/api/posts/update_post/:postId`
- **Method**: `PATCH`
- **Params**: `postId`
- **Request Body**:
  - `title` (string): Post title.
  - `content` (string): Post content.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Updates an existing blog post.

### 4. Get All Posts
- **Endpoint**: `/api/posts/get_all_posts`
- **Method**: `GET`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Fetches all blog posts.

### 5. Delete Post
- **Endpoint**: `/api/posts/delete_post/:postId`
- **Method**: `DELETE`
- **Params**: `postId`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Deletes a blog post by ID.

### 6. Get Detailed Post
- **Endpoint**: `/api/posts/fetch/detailed_posts`
- **Method**: `GET`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Fetches detailed information of posts.

### 7. Get Post by Searching Text
- **Endpoint**: `/api/posts/search`
- **Method**: `GET`
- **Query Parameters**:
  - `searchString` (string): The text to search for in titles and content (each string is separated by space).
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Searches for posts by text.

### 8. Get Posts Based on Tags
- **Endpoint**: `/api/posts/tags`
- **Method**: `GET`
- **Query Parameters**:
  - `tags` (string): Comma-separated tags to search for.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Searches for posts based on tags.

### 9. Add Tags to Post
- **Endpoint**: `/api/posts/add_tags/:postId`
- **Method**: `PATCH`
- **Params**: `postId`
- **Query Parameters**:
  - `tags` (string): Comma-separated tags to add.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Adds tags to a post.

### 10. Remove Tags from Post
- **Endpoint**: `/api/posts/remove_tags/:postId`
- **Method**: `PATCH`
- **Params**: `postId`
- **Query Parameters**:
  - `tags` (string): Comma-separated tags to remove.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Removes tags from a post.


# Comment Management API

## Overview
This document provides details on the endpoints available for managing comments on blog posts in the system. These endpoints allow you to write, edit, and delete comments.

## API Endpoints

### 1. Write Comment
- **Endpoint**: `/api/comments/add`
- **Method**: `POST`
- **Request Body**:
  - `postId` (string): ID of the post to comment on.
  - `comment` (string): Comment content.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Adds a comment to a post.

### 2. Edit Comment
- **Endpoint**: `/api/comments/update/:postId`
- **Method**: `PATCH`
- **Request Body**:
  - `comment` (string): Comment content.
- **Params**: `postId`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Edits an existing comment.

### 3. Delete Comment
- **Endpoint**: `/api/comments/delete/:postId`
- **Method**: `DELETE`
- **Params**: `postId`
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Deletes a comment by ID.

# Like Management API

## Overview
This document provides details on the endpoints available for managing likes on blog posts in the system. These endpoints allow you to add and remove likes from posts.

## API Endpoints

### 1. Put Like to a Post
- **Endpoint**: `/api/likes/add/:postId`
- **Method**: `POST`
- **Params**: 
  - `postId` (string): ID of the post to like.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Adds a like to a post.

### 2. Remove Like from a Post
- **Endpoint**: `/api/likes/delete/:postId`
- **Method**: `DELETE`
- **Params**: 
  - `postId` (string): ID of the post to unlike.
- **Headers**:
  - `authorization` (Bearer Token)
- **Description**: Removes a like from a post.

## If you have any doubts please verify the docs folder which contains endpoints documentation


