import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'
// import { App2 } from "./App2"; //micro-task

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      {/* <App2 /> */}
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();


// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// type UserType = {
//   id: number
//   name: string
//   age: number
// }

// function User(props: UserType) {
//   return (
//     <li>User {props.name}: {props.age} y.o.</li>
//   )
// }

// function UsersList() {
//   const state = [
//     { id: 1, name: "Bob", age: 34 },
//     { id: 2, name: "Alex", age: 25 },
//     { id: 3, name: "Ann", age: 30 },
//     { id: 4, name: "John", age: 23 },
//   ]
//   const users = [
//     { id: 1, userName: "Bob", age: 34 },
//     { id: 2, userName: "Alex", age: 25 },
//     { id: 3, userName: "Ann", age: 30 },
//     { id: 4, userName: "John", age: 23 },
//   ]

//   const [usersList, setUsersList] = useState<Array<UserType>>(state)

//   return (
//     <main>
//       <h5>User list:</h5>
//       <p>{usersList.map(user => < User key={user.id} name={user.name} age={user.age} id={0} />)}</p>
//     </main>
//   )
// }

// ReactDOM.render(
//   <UsersList />, document.getElementById('root')
// );

