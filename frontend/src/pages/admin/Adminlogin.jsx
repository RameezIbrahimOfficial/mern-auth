import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AdminLogin as adminLogin, reset } from "../../features/auth/adminAuthSlice"
import Spinner from "../../components/Spinner"


function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.adminAuth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || admin) {
            navigate('/admin')
        }

        dispatch(reset())

    },[admin, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const adminData = {
            email, password
        }

        dispatch(adminLogin(adminData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Admin Login</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter Your Email" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="password" name="password" value={password} placeholder="Enter Your Password" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default AdminLogin
