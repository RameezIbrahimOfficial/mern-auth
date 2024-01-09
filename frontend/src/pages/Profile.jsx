import axios from "axios"

function Profile() {
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/api/users/profile', {
            value: 'test'
        })
        
        alert(response)
    }


    return (
        <div>
            <h1>Profile Page</h1>
            <h3>Upload Profile Picture</h3>
            <form>
                <div className="form-group">
                    <img src="" alt="profile" /> <br />
                </div>
                <div className="form-group">
                    <input type="file" name="profile" id="profile" />
                </div>
                <div className="form-group">
                    <button className="btn" onClick={handleClick}>Upload!</button>
                </div>
            </form>
        </div>
    )
}

export default Profile
