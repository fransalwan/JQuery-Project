#Endpoints
List of Avaliable Endpoints:

# Admin

- POST /register
- POST /login
- GET /cuisines
- POST /cuisines
- GET /cuisines/:id
- PUT /cuisines/:id
- PATCH /cuisines/:id
- DELETE /cuisines/:id
- GET /categories
- POST /categories
- DELETE /categories/:id

# Customer

- POST /cust/register
- POST /cust/login
- POST /cust/OAuthLogin
- GET /cust/cuisines
- GET /cust/cuisines/:id
- GET /cust/favorites
- POST /cust/favorites/:id

# POST / register

## Description

      -  Register User

## Response

200 - OK - Body
{
"id": 5,
"email": "frans13@gmail.com"
}

400 - Bad Request

{
"message": string
}

# POST / login

## Description

      -  Login User

## Response

200 - OK - Body
{
"username": "username "
"access_token": "access_token"
}

401 - Not Authorized

{
"message": string
}

# GET / cuisines

## Description

      -  Get All Cuisines data

## Response

200 - OK - Body
[
{
"id": 3,
"name": "Sayur Pare",
"description": "Enak........",
"price": 2000,
"imgUrl": "pare.png",
"authorId": 1,
"categoryId": 1,
"createdAt": "2023-07-10T06:40:44.355Z",
"updatedAt": "2023-07-10T06:40:44.355Z",
"User": {
"id": 1,
"username": "fransalwan",
"email": "frans@gmail.com",
"password": "$2a$10$GdiEdyQBe1XQPVxdKkXb6.hNsdjJL9MSHYFMhxg04mb85AWcBpvB6",
"role": null,
"phoneNumber": "8193578017",
"address": "bsd",
"createdAt": "2023-07-10T05:51:26.670Z",
"updatedAt": "2023-07-10T05:51:26.670Z"
}
},
{
"id": 5,
"name": "rendang",
"description": "Maknyuss",
"price": 10000,
"imgUrl": "rendang.png",
"authorId": null,
"categoryId": 2,
"createdAt": "2023-07-10T07:12:37.320Z",
"updatedAt": "2023-07-10T07:12:37.320Z",
"User": null
}
]

# POST /cuisines

## Description

- Create a new cusine data

## Request

- Headers
  {
  "Content-Type": "application/json; charset=utf-8"
  }
- Body
  {
  "message": {
  "name": "name baru",
  "description": "desc baru",
  "price": 10000,
  "imgUrl": "img.png",
  "authorId": 1,
  "categoryId": 1,
  }
  }

  ## Response

{
"message": {
"id": 6,
"name": "rendang2",
"description": "Maknyusss",
"price": 10000,
"imgUrl": "rendang.png",
"categoryId": 2,
"updatedAt": "2023-07-10T07:29:49.608Z",
"createdAt": "2023-07-10T07:29:49.608Z",
"authorId": null
}
}
400 - Bad Request

- Body
  {
  "message": string
  }

# GET /cuisines/:id

## Description

- See Detail data based in given id

## Response

200 - OK
Body
{
"id": 3,
"name": "Sayur Pare",
"description": "Enak........",
"price": 2000,
"imgUrl": "pare.png",
"authorId": 1,
"categoryId": 1,
"createdAt": "2023-07-10T06:40:44.355Z",
"updatedAt": "2023-07-10T06:40:44.355Z"
}

404 - Not Found
Body
{
"message": "Error not found"
}

# PUT /cusines/:id

## Description

      - Edit  a cuisines data based on given id

## Response

200 - OK
Body
{
"message": "Data with id 2 has been updated"
}

404 - Not Found
Body
{
"message": "Error not found"
}

# PATCH /cusines/:id

## Description

      - Edit status cuisines data based on given id

## Response

200 - OK
Body
{
"message": "Data with id 2 has changed its status to Inactive"
}

404 - Not Found
Body
{
"message": "Error not found"
}

# Delete /cusines/:id

## Description

      - Remove a cuisines data based on given id

## Response

200 - OK
Body
{
"message": "rendang2 success to delete"
}

404 - Not Found
Body
{
"message": "Error not found"
}

# GET /categories

## Description

      -  Get All Categories data

## Response

200 - OK - Body
[
{
"id": 1,
"name": "Sayur",
"createdAt": "2023-07-10T07:57:08.676Z",
"updatedAt": "2023-07-10T07:57:08.676Z"
},
{
"id": 2,
"name": "Lauk",
"createdAt": "2023-07-10T07:57:08.676Z",
"updatedAt": "2023-07-10T07:57:08.676Z"
}
]

# POST /categories

## Description

      -  Add New Categories data

## Response

200 - OK - Body
{
"message": {
"id": 3,
"name": "baru",
"updatedAt": "2023-07-14T03:23:20.791Z",
"createdAt": "2023-07-14T03:23:20.791Z"
}
}

# DELETE /categories/:id

## Description

      -  Delete Categories data

## Response

200 - OK - Body
{
"message": "baru success to delete"
}

- POST /cust/register
- POST /cust/login
- POST /cust/OAuthLogin
- GET /cust/cuisines
- GET /cust/cuisines/:id
- GET /cust/favorites
- POST /cust/favorites/:id

# POST / cust / register

## Description

      -  Register Customer

## Response

200 - OK - Body
{
"id": 1,
"email": "alwan@gmail.com"
}

400 - Bad Request

{
"message": string
}

# POST / cust / login

## Description

      -  Login Customer

## Response

200 - OK - Body
{
"username": "username"
"access_token": "access_token"
}

401 - Not Authorized

{
"message": string
}

# GET / cust / cuisines

## Description

      -  Get All Cuisines data

## Response

200 - OK - Body

{
"data": [
{
"id": 2,
"name": "Ayam",
"description": "Mantapssss",
"price": 6000,
"imgUrl": "https://th.bing.com/th/id/OIP.SKKLqQ9BOix3Uhgh1aIRTwHaFP?w=265&h=188&c=7&r=0&o=5&dpr=1.4&pid=1.7",
"status": "Active",
"authorId": 1,
"categoryId": 2,
"createdAt": "2023-07-25T08:42:29.070Z",
"updatedAt": "2023-07-25T08:42:29.070Z"
}
],
"pagination": {
"total_records": 5,
"total_perpage": 1,
"total_page": 5,
"current_page": 1,
"next_page": 2,
"previous_page": null
}
}

# GET / cust / cuisines / :id

## Description

- Get Detail Cuisines by Id

  ## Response

  201 - OK - Body

  {
  "message": {
  "id": 1,
  "name": "Sayur Pare",
  "description": "Enak........",
  "price": 2000,
  "imgUrl": "https://th.bing.com/th/id/OIP.1MbY8nXojoYh3-o79ym5yAHaFj?w=206&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
  "status": "Active",
  "authorId": 1,
  "categoryId": 1,
  "createdAt": "2023-07-25T08:42:29.070Z",
  "updatedAt": "2023-07-25T08:42:29.070Z"
  },
  "data": "svg"
  }
  500 - Bad Request

{
"message": "Internal Server Error"
}

# GET / cust / favorites /

## Description

- Get All FavoriteList Cuisines

  ## Response

  201 - OK - Body

  {
  "message": [
  {
  "id": 1,
  "CuisineId": 1,
  "CustomerId": 1,
  "createdAt": "2023-07-25T08:42:29.343Z",
  "updatedAt": "2023-07-25T08:42:29.343Z",
  "Cuisine": {
  "id": 1,
  "name": "Sayur Pare",
  "description": "Enak........",
  "price": 2000,
  "imgUrl": "https://th.bing.com/th/id/OIP.1MbY8nXojoYh3-o79ym5yAHaFj?w=206&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
  "status": "Active",
  "authorId": 1,
  "categoryId": 1,
  "createdAt": "2023-07-25T08:42:29.070Z",
  "updatedAt": "2023-07-25T08:42:29.070Z"
  }
  },
  {
  "id": 2,
  "CuisineId": 2,
  "CustomerId": 1,
  "createdAt": "2023-07-25T08:42:29.343Z",
  "updatedAt": "2023-07-25T08:42:29.343Z",
  "Cuisine": {
  "id": 2,
  "name": "Ayam",
  "description": "Mantapssss",
  "price": 6000,
  "imgUrl": "https://th.bing.com/th/id/OIP.SKKLqQ9BOix3Uhgh1aIRTwHaFP?w=265&h=188&c=7&r=0&o=5&dpr=1.4&pid=1.7",
  "status": "Active",
  "authorId": 1,
  "categoryId": 2,
  "createdAt": "2023-07-25T08:42:29.070Z",
  "updatedAt": "2023-07-25T08:42:29.070Z"
  }
  },
  ]
  }

  500 - Bad Request

{
"message": "Internal Server Error"
}

# POST / cust / favorites / :id

## Description

- Post Cuisine to favorite list

  ## Response

  201 - OK - Body
  {
  "message": [
  {
  "id": 1,
  "CuisineId": 1,
  "CustomerId": 1,
  "createdAt": "2023-07-25T08:42:29.343Z",
  "updatedAt": "2023-07-25T08:42:29.343Z"
  },
  false
  ]
  }

  500 - Bad Request

{
"message": "Internal Server Error"
}

# Global Error

500 - Internal Server Error

- Body
  {
  "message": "Internal Server Error"
  }

// coba ulik Open API biar lebih rapih doc nya
