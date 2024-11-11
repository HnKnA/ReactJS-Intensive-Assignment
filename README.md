# How to set up and run MyShop Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Access the application Using Public Hosted Link

Open the application in your web browser:
### `https://at-reactjs-intensive-1b521d331384.herokuapp.com`

## Run the app locally

Clone the code from GitHub repository:

### `git clone https://github.com/HnKnA/ReactJS-Intensive-Assignment.git`

Install necessary dependencies:

### `yarn install`

Or use `npm install` if your package manager is `npm`.

Launch the application:

### `yarn dev`

Or `npm run dev`.

Access the application at `http://localhost:3000/`.


## Note:
### ProtectedRoute:
- The `role` field is not yet available for users, so `ProtectedRoute` will use username to determine each role.

- Access as "fake admin" by log in with ***username:*** `tuan` and ***password:*** `Anhtuan@123456`.

- Or I've prepared some privileged username such as `spring`, `summer`, `autumn`, `winter`. You can create new account with any of these usernames to access the `/user` vs `/order` pages.

![image](https://github.com/user-attachments/assets/25b9641f-ee79-497e-9466-77dd0c51664d)

### Search bar:
- Product's search bar is unavailable due to a failure to access `/api/shop/product/search` endpoint.

- The user list is fetched by calling `/api/user/search` with `searchKey` "a" to retrieve all available users, as the endpoint to GET all users is currently unavailable. After that, you can use the search bar on user's page as normal.

### Add or Update image field:
- Only the CREATE product API is available at the moment, and it does not affect the product list after successfully creating a product. Therefore, you can add an arbitrary string to replace this field in the form.

- This functionality will be updated as soon as the user's role feature is implemented.

![image](https://github.com/user-attachments/assets/4cbd2afa-85da-40a2-87c6-9458dc10f522)

### Order page:
- For the time being, every user is treated as "normal user", meaning each person can only access and complete their own orders. However, with "fake admin" privilege in place, only the following username can acccess the page and view their orders [`tuan`, `spring`, `summer`, `autumn`, `winter`].

- Usernames outside of this list can not access /order page normally.

## Services:
### Product page:
![image](https://github.com/user-attachments/assets/f4715b4a-e327-4765-a4d9-0b60f25583be)
- Search bar is unavailable.
- Filter products based on their category (Javascript implemented).
- Create Order.
- Add, View, Edit, Delete (Product).

### Order page (fake admin privilege):
![image](https://github.com/user-attachments/assets/ac6a3884-2ce0-405a-9218-9b5c364416b4)
- Complete pending orders.
- View personal orders.
- Can not view all orders of all users because there is no admin at the moment.

### User page (fake admin privilege): 
![image](https://github.com/user-attachments/assets/49819f8a-2819-4886-bd2d-91f07983f3e8)
- Search/Filter users

### Account page (click on your username on the header):
![image](https://github.com/user-attachments/assets/4a76292b-9059-4e57-945c-90ca9df88ed6)
- Readonly form

### Register, Login, Verify.
### Light/Dark theme (sun icon on the header). 
### Log out.

## I will also update many comments later for the ease or reading code.
