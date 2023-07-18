import React from 'react';
import './App.css';
import List from '../src/components/List';

function App() {
  const title1 = "This is title one"
  const title2 = 12235
  const title3 = true

  const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]


  return (
    <div className="App">
      <List tasks={tasks1} title1={title1} />
      <List tasks={tasks2} title2={title2} />
      <List tasks={tasks2} title3={title3} />
    </div>
  );
}

export default App;


