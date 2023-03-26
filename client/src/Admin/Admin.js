import { useEffect, useState } from 'react';

function Admin(props) {
  const [users, setUsers] = useState([])

  function deleteUser(email) {
    // eslint-disable-next-line no-restricted-globals
    let deleteCheck = confirm("Are you sure you want to delete this user?");
    if (deleteCheck){
      const url = `/admin/delete/user`;
      const headers = {
        method: "POST",
        body: JSON.stringify({ adminEmail: props.email, deleteEmail: email, token: props.token }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
  
        }
      }
      // Send Post Request 
      fetch(url, headers)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.Error);
          }
        })
    }
  }
  function giveAdminPerms(email) {

  }
  function removeAdminPerms(email) {

  }
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
          throw new Error(response.Error);
        } else {
          return response.json();
        }
      })
      .then(data => {
        // Set the users received from response
        setUsers(data.users)
      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);

  let userSection = users.map(user => {
    if (user.email !== props.email) {
      return (
        <div id="user-section">
          <img src={user.picture} width="75" height="75" alt="profile-pic"></img>
          <br></br>
          User: {user.name}
          <br></br>
          Email: {user.email}
          <br></br>
          <button onClick={() => deleteUser(user.email)}>Delete</button>
          <br></br>
          {/* If user is not an admin, there will be a button to give admin perms */}
          {!user.isAdmin && <button onClick={() => giveAdminPerms(user.email)}>Set Admin</button>}
          {/* If user is an admin, there will be a button to remove admin perms */}
          {user.isAdmin && <button onClick={() => removeAdminPerms(user.email)}>Remove Admin</button>}
        </div>
      )
    }
  }
  )

  return (
    <div>
      Admin Dashboard:
      {userSection}
    </div>
  )
}


export default Admin