import React from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

    const [users, setUsers] = React.useState([])
    const [invites, setInvites] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [success, setSuccess] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        fetch('https://super-cms.lead.media/api/regions')
            .then(res => res.json())
            .then(json => {
                setUsers(json.data);
            }).catch(err => {
            console.warn(err);
            alert("Ошибка при получении пользователя")
        }).finally(() => setLoading(false))
    }, []);

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id])
        }
    }

    const onCLickSendInvites = () => {
        setSuccess(true);
    }

    return (
        <div className="App">
            {
                success ? (
                    <Success count={invites.length} />
                ) : (
                    <Users items={users} isLoading={isLoading} searchValue={searchValue}
                           onChangeSearchValue={onChangeSearchValue} invites={invites} onClickInvite={onClickInvite} onClickSendInvites={onCLickSendInvites}/>
                )
            }
        </div>
    );
}

export default App;
