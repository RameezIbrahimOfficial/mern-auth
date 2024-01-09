import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { profileUpdate } from "../../features/auth/authSlice";


function Profile() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(()=>{},[dispatch, user])


    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");


    const uploadImage = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "dyfsmyk5")
        data.append("cloud_name", "dsktu4sm8")
        fetch("https://api.cloudinary.com/v1_1/dsktu4sm8/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                dispatch(profileUpdate(data.url))
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h1>Profile Page</h1>
            <h3>Upload Profile Picture</h3>
            <img src={user?.profileUrl ? user.profileUrl : ''} alt="profile" height="100px"/>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
            <form>
                <div className="form-group">
                    <img src={url ? url : ''} alt="profile" height='250px'/> <br />
                </div>
                <div className="form-group">
                    <input type="file" name="profile" id="profile" onChange= {(e)=> setImage(e.target.files[0])}/>
                </div>
                <div className="form-group">
                    <button className="btn" onClick={uploadImage}>Upload!</button>
                </div>
            </form>
        </div>
    )
}

export default Profile
