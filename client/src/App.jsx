import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [userName, setUsername] = useState("")
  const [newName, setNewname] = useState("")


  const reloadPage = () => {
    window.location.reload();
  }
  //Fetch all users
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const allUsers = await axios.get('http://localhost:8000');
        setUsers(allUsers.data.allUsers.reverse())
      } catch (error) {
        alert(`Error is : ${error}`)
      }
    };

    fetchAllUser();
  }, [])

  //Create User
  const createUser = async () => {
    try {
      await axios.post('http://localhost:8000', { name: userName })
      setUsername('');

    } catch (error) {
      alert(`Error : ${error}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
    reloadPage()
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/${userId}`);
    } catch (error) {
      alert(`Error : ${error}`)
    }
    reloadPage()

  }

  const updateUser = async (userId) => {

    if (newName == "") return alert("Enter new name ");
    try {
      await axios.put(`http://localhost:8000/${userId}`, { newName })
    } catch (error) {
      alert(`Error : ${error}`)
    }
    reloadPage()
  }

  return (
    <>
      <div>

        <button onClick={reloadPage}>🔄️ Reload the list to see changes</button>
        <h1>All users</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" style={{ padding: "9px 19px", border: "none", minWidth: "50%" }} placeholder='enter name' value={userName} onChange={(e) => setUsername(e.target.value)} />
        </form>
      </div>
      <div style={{ margin: "20px 0" }}>

        {users.length == 0 ? (<><h2>No users are present ... 🙆‍♂️</h2></>) : users.map((user) => {
          return (
            <div key={user._id} style={{ backgroundColor: "#26263f", margin: "30px 0", display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: "10px 0", fontWeight: "bold" }}>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <p style={{ margin: "10px 0" }}>
                  Name: {user?.name || "No name"}
                </p>
                <button style={{ marign: "3px 3px" }} onClick={() => deleteUser(user._id)}>Delete User</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <input type="text" style={{ margin: "10px 0", padding: "9px", border: "none" }} placeholder='updated name' onChange={(e) => setNewname(e.target.value)} />
                <button style={{ marign: "3px 3px" }} onClick={() => updateUser(user._id)}>Update User</button>
              </div>
            </div>
          )
        })}

      </div>

    </>
  )
}

export default App
