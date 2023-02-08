import logo from './logo.svg';
import './App.css';

import Form from './components/Form.js'
import ImageForm from './components/ImageForm.js'
import PostSection from './components/PostSection';
import ProfileSection from './components/ProfileSection';


function App() {
  
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Form />
      <br></br>
      <ImageForm />
      <h2>User Comments:</h2>
      {/* <PostSection /> */}
      <h2>User profiles:</h2>
      <ProfileSection/>
    </div>
  );
}

export default App;
