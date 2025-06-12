import {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const jsonResponse = await response.json()

        if (response.ok) {
            localStorage.setItem('token', JSON.stringify(jsonResponse.token))
            setTimeout(() => {
                navigate('/blog', { replace: true })
            }, 1000)
        }

        return jsonResponse
    }

    const onRedirectGithub = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/github`
    }

    const onGoogleRedirect = () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/google`
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col">
                    <form
                        onSubmit={onSubmit}
                        className='d-flex flex-column gap-2'>
                        <input
                            onChange={onChangeInput}
                            className='form-control'
                            name='email'
                            type="text"
                        />
                        <input
                            onChange={onChangeInput}
                            className='form-control'
                            name='password'
                            type="password"
                        />
                        <button className='btn btn-info'>
                            LOGIN
                        </button>
                    </form>
                    <div className='mt-5'>
                        <button
                            onClick={onRedirectGithub}
                            className='btn btn-dark'>
                            LOGIN CON GITHUB
                        </button>
                        <button
                            className="btn btn-info"
                            onClick={onGoogleRedirect}
                        >
                            LOGIN WITH GOOGLE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;