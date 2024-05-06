const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const {createRoot} = require('react-dom/client');

const GetUsers = (props) => {
    const [users, setUsers] = useState(props.users);
    console.log(users);
    useEffect(() => {
        const loadUsersFromServer = async () => {
            const response = await fetch('/users');
            const data = await response.json();
            setUsers(data);
        };
        loadUsersFromServer();
    }, [props.reloadUsers]);

    if(users.length === 0) {
        return (
            <div className="">
                <h3>No Logins Yet!</h3>
            </div>
        );
    }

    const userNodes = users.map(account => {
        return (
            <div className="users">
                <h3 className="user">Username: {account.username}</h3>
            </div>
        );
    });

    return (
        <div className="userList">
            {userNodes}
        </div>
    );
};

const AdminWindow = () => {
    const [reloadUsers, setReloadUsers] = useState(false);

    return (
        <div id="users">
            <GetUsers users={[]} reloadUsers={reloadUsers} />
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('list'));

    root.render( <AdminWindow /> );
};

window.onload = init;