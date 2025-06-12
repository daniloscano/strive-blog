import {useEffect, useState} from 'react';
import AddPostForm from "../components/addPostForm/AddPostForm.jsx";
import useSession from "../hooks/useSession.js";
import {useNavigate} from "react-router-dom";

const BlogPage = () => {
    const session = useSession()
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts`)
            const data = await response.json()
            console.log(data.posts)
            setPosts(data.posts)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPosts()
    }, []);

    const onLogout = () => {
        localStorage.removeItem('token')
        navigate('/', { replace: true })
    }

    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col">
                    Benvenuto {session.firstName} {session.lastName}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button
                        className='btn btn-danger'
                        onClick={onLogout}
                    >LOGOUT
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <AddPostForm/>
                </div>
            </div>
            <div className="row">
                {posts && posts?.map((post, idx) => (
                    <div key={`post-${idx}`} className='col-12 col-md-6 col-lg-4'>
                        <img
                            className='img-fluid'
                            src={post.img}
                            alt={post.title}
                        />
                        <p>{post.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default BlogPage;