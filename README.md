# OCBC BANK ASSIGNMENT
 
## Dependency

- React (**17.0.2**)
- Material UI Icons (**5.3.0**)
- Material UI (**5.3.0**)
- Axios (**0.25.0**)
- Moment (**2.29.1**)
- React Router v6
 
 - **No jQuery and Bootstrap!** 
 
### `npm install`

This will install run-time project dependencies listed
in [package.json](package.json) file.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Shared Components

- Header - Drawer component for left side links. Title header.
- Footer - Copyright text information
- LeftMenu - Menu links( Dashboard, Transfer Funds)  

## Modules

- Register - Registration form (sign up) for new user registration
- Login - Login form (sign in) for existing users. if succeed it will redirect to Home page
- Home - It has two components Dashboard and Fund Transfer. Dashboard is the default landing component.
- Dashboard - It has account information and Transaction history details
- Fund Transfer - It has fund transfer form. After transfer, will get success information.


## Utils

- useForm (**Custom Hook for Form validation**)
- validation (**Validaion rules for login, register,and fund transfer**)
- Function (**Number Formatting Function for Amount**)

## Test Files in __tests__ path
- App
- Register
- Login
- Home
- Dashboard
- Fund Transfer

## Developer

- Arunkumar
 