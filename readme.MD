# Coderhouse Backend REST API Server

## Useful information

1. **views** _are still not generated_, instead they are replaced by mock routes located on the routes/home directory to test redirections, user session and admin auth.
2. **API path** for all useful endpoints is '**_/api/v1_**', **_eg_**: localhost:8080/api/v1/**_ENDPOINT_**
3. There are 3 main endpoint routes: '**/sessions**', '**/products**', '**/users**' and '**/orders**'.
4. **Cart** functionality is embedded on each User database object, which means its functionality is related and its corresponding enpoints are inside of **/users** path and are contained in the '**users.repository.js**' and '**users.controllers.js**' file.
5. Both '**/sessions**' and '**/products**' endpoints have a random payload generator acording to its model that are only available when NODE_ENV is **not** in production mode. **_eg_**: localhost:8080/api/v1/**_ENDPOINT_**/randomize.
6. The only endpoint that contains a query param as a helper for populating users field in said request is **'/orders/list'**. Query param is _?user=true_

## Endpoints

### **_Path Structure_** eg:_{{domain}}{{port}}/{{apiPath}}_/**_ENDPOINT_**/_:params_

### Sessions endpoints

Available routes are:

1. INFO : GET at _{{apiPath}}_/sessions: **no required body.**
2. REGISTER : POST at _{{apiPath}}_/sessions/register: required body is: **email, password, name, lastname, username.**
3. LOGIN : POST at _{{apiPath}}_/sessions/login: **required body is: email, password.**
4. LOGOUT : POST at _{{apiPath}}_/sessions/logout: **no required body.**
5. REFRESH ACCESS TOKEN: GET at _{{apiPath}}_/sessions/refresh: **no required body.**

### Products endpoints

Available routes are:

1. GENERATE RANDOM PRODUCTS: GET at _{{apiPath}}_/products/randomize: **no required body.**
2. GENERATE PRODUCT LIST: GET at _{{apiPath}}_/products: **no required body.**
3. GET BY ID: GET at _{{apiPath}}_/products/:userid: **no required body.**
4. DELETE BY ID: DELETE at _{{apiPath}}_/products/:userid: **no required body.**
5. POST PRODUCT: POST at _{{apiPath}}_/products: **required body: title, price. optional body: description, stock, image**
6. UPDATE PRODUCT: PUT at _{{apiPath}}_/products:userid: **optional body: description, stock, price, image**

### Users endpoints

Available routes are:

1. GENERATE RANDOM USERS: GET at _{{apiPath}}_/users/randomize: **no required body.**
2. GET USERS LIST: GET at _{{apiPath}}_/users: **no required body.**
3. GET BY ID: GET at _{{apiPath}}_/users/:userid: **no required body.**
4. DELETE BY ID: DELETE at _{{apiPath}}_/users/:userid: **no required body.**
5. POST USER: POST at _{{apiPath}}_/users: **required body: name, lastname, username, email, password.**
6. UPDATE USER PASSWORD: PUT at _{{apiPath}}_/users/:userid: **required body: name, lastname, username, email, password.**
7. GET USER CART: GET at _{{apiPath}}_/users/:userid: **required body: name, lastname, username, email, password.**
8. ADD PRODUCT TO CART: PUT at _{{apiPath}}_/users/:userid: **required body: productid = id**   (_!needs to be a valid mongodb id and endpoint check if its available_).**optional body: quantity = number.**
9. REMOVE PRODUCT FROM CART: DELETE at _{{apiPath}}_/users/:userid: **required body: productid = id**   (_!needs to be a valid mongodb id and endpoint check if its available_).**optional body: quantity = number.**

### Orders endpoints

1. GET SYSTEM ORDERS: GET at _{{apiPath}}_/orders/list: **no required body.**
2. GET USER ORDERS: GET at _{{apiPath}}_/orders/list: **no required body.**  \. **Active session is required!.**
3. POST ORDER: POST at _{{apiPath}}_/orders/list: **no required body.** \. **Active session is required!**

### Test endpoints

Available routes are (**_routes to test redirection, user auth, and admin auth_**):

1. TEST USER SESSION AUTH: GET at localhost:8080/auth: **no required body.**
2. TEST ADMIN SESSION AUTH: GET at localhost:8080/adminAuth: **no required body.**
