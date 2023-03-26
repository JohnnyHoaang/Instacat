import { useEffect, useState } from 'react';

function Admin(props) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const url = `/admin/users`;
    const headers = {
      method: "POST",
      body: JSON.stringify({ email: props.email, token: props.token }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",

      }
    }
    // Send Post Request 
    fetch(url, headers)
      .then(response => {
        if (!response.ok) {
          throw new Error('fetching issue', response.Error);
        } else {
          return response.json();
        }
      })
      .then(data => {
        console.log(data)
        // Set the users received from response
        setUsers(data.users)
      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);

  let userSection = users.map(user =>
    <div id="user-section">
      <img src={user.picture} width="75" height="75"></img>
      <br></br>
      User: {user.name}
      <br></br>
      Email: {user.email}
      <br></br>
      <button>Delete</button>
    </div>
  )

  return (
    <div>
      Admin Dashboard:
      {userSection}
    </div>
  )
}


export default Admin