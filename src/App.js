import './App.css';
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery } from './redux/usersApi'
import {useState} from "react";
import dog from './cute-dachshund-puppy-hand-mistress_414160-1577.webp';

const App = () =>  {
  const [count, setCount] = useState('');
  const [newUser, setNewUser] = useState('')

  const { data: users = [], isLoading, isFetching} = useGetUsersQuery(count);
  // console.log('query' , useGetUsersQuery())
  // const { data: users = [], isLoading} = useGetUsersQuery(count, {
  //   pollingInterval: 500,
  // });
  const [addUser, { isError }] = useAddUserMutation();
  // console.log('mutation', useAddUserMutation())
  const [deleteUser] = useDeleteUserMutation();

  const handleAddProduct = async () => {
    if (newUser) {
      await addUser({name : newUser}).unwrap();
      setNewUser('')
    }
  }

  const handleDeleteUser = async (id) => {
    await deleteUser(id).unwrap();
  }

  if (isLoading) return (
    <div className='loader'>
      <img src={dog} alt=""/>
      <h1>Loading...</h1>
    </div>)

  if (isFetching) return (
    <div className='loader'>
      <img src={dog} alt=""/>
      <h1>Fetch...</h1>
    </div>)

  return (
    <div className='wrap'>
      <div className='input'>
        <input
          type="text"
          value={newUser}
          onChange={(e) => {
          setNewUser(e.target.value)
        }}/>
        <button type="button" onClick={handleAddProduct}>Add user</button>
      </div>
      <div className='list'>
        <select
          value={count}
          onChange={(e) => {
          setCount(e.target.value)
        }}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleDeleteUser(user.id)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
