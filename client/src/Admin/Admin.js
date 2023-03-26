function Admin(props) {
  return (
    <div>
      Admin Dashboard:
      <input type="hidden" value={props.token}></input>
    </div>
  )
}


export default Admin