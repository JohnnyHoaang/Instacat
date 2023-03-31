/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
/**
 * Admin dashboard that allows admin to manage users
 * @param {*} props 
 * @returns {Component} Admin
 * @author Johnny Hoang
 */
function Admin(props) {
  const [users, setUsers] = useState([])
  // State that changes when user is deleted 
  const [state, setState] = useState(false)
  /**
   * Delete Specific user by sending post request
   * @param {String} email 
   */
  function deleteUser(email) {
    let deleteCheck = confirm("Are you sure you want to delete this user?");
    if (deleteCheck) {
      let payload = JSON.stringify({ adminEmail: props.email, deleteEmail: email, adminToken: props.tokens.admin })
      sendFetchRequest(`/admin/delete/user`, payload);
      setState(!state)
    }
  }
  /**
   * Sets admin permission of user by sending post request
   * @param {String} email 
   * @param {Boolean} isAdmin 
   */
  function setAdminPerms(email, isAdmin) {
    let adminCheck
    if (isAdmin) {
      adminCheck = confirm("Are you sure you want to grant this user admin permissions?");
    } else {
      adminCheck = confirm("Are you sure you want to remove this user's admin permissions?");
    }
    if (adminCheck) {
      let payload = JSON.stringify({ adminEmail: props.email, email: email, isAdmin: isAdmin, adminToken: props.tokens.admin })
      sendFetchRequest(`/admin/permissions`, payload);
      // Switch state indicating that the user has been deleted
      setState(!state)
    }
  }

  /**
   * Send post request to given route with payload and returns request response
   * @param {String} url 
   * @param {Object} payload 
   * @returns Response
   */
  async function sendFetchRequest(url, payload) {
    const headers = {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      }
    };
    // Send Post Request 
    return await fetch(url, headers)
  }

  useEffect(() => {
    let payload = JSON.stringify({ email: props.email, adminToken: props.tokens.admin })
    sendFetchRequest(`admin/users`, payload)
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
  }, [state]);

  const userSection = users.map(user => {
    if (user.email !== props.email) {
      return (
        <div id="user-section">
          <img src={user.picture} width="75" height="75" alt="profile-pic"></img>
          <br></br>
          User: {user.name}
          <br></br>
          Email: {user.email}
          <br></br>
          <button onClick={async () => deleteUser(user.email)}>Delete</button>
          <br></br>
          {/* If user is not an admin, there will be a button to give admin perms */}
          {!user.isAdmin && <button onClick={() => setAdminPerms(user.email, true)}>Set Admin</button>}
          {/* If user is an admin, there will be a button to remove admin perms */}
          {user.isAdmin && <button onClick={() => setAdminPerms(user.email, false)}>Remove Admin</button>}
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

