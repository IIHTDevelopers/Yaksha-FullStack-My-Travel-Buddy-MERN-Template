import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div>
            <h1>Login Account</h1>
        </div>
    );
}

export default Login;
