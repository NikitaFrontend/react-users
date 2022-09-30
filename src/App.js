import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

function App() {
  const [usersArr, setUsersArr] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [invites1, setInvites1] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsersArr(json.data))
      .catch((err) => {
        console.warn(err);
        alert('ошибка при получении пользователя');
      })
      .finally(() => setLoading(false));
  }, []);

  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite1 = (id) => {
    if (invites1.includes(id)) {
      setInvites1(invites1.filter((_id) => _id != id));
    } else {
      setInvites1([...invites1, id]);
    }
  };

  const onClickSucces = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites1.length} />
      ) : (
        <Users
          onClickSucces={onClickSucces}
          searchValue={searchValue}
          usersArr={usersArr}
          isLoading={isLoading}
          onChangeSearchValue={onChangeSearchValue}
          onClickInvite1={onClickInvite1}
          invites1={invites1}
        />
      )}
    </div>
  );
}

export default App;
