# Task-4-rest-api

## How to use it 
#### You should have mongodb installed and running on your machine
### For the first time run
```
npm i
```
### To run the server
```
node app.js
```
#### To create a user use HTTP verb POST
```
http://localhost:5000/users/<email of the user>
then add to the body name and phone in json form
{
"name":<name>,
"phone":<phone>
}
```
#### To delete a user use HTTP verb DELETE
```
http://localhost:5000/users/<email of the user>
```
#### To get a user use HTTP verb GET
```
http://localhost:5000/users/<email of the user>
```

#### To get all users use HTTP verb GET
```
http://localhost:5000/users
```
#### To update a user use HTTP verb PUT
```
http://localhost:5000/users/<email of the user>
then add to the body name and phone in json form
{
"name":<name>,
"phone":<phone>
}
```

### contributors
* Abdulrahman Fahmy  https://github.com/abdulrhman500
* Alaa Hisham https://github.com/3laaHisham
