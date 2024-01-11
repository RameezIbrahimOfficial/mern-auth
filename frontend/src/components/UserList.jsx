import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, editUser, UserBlock, UserUnBlock, reset, AdminLogout } from '../features/auth/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const users = useSelector((state) => state.adminAuth.users);
    const isLoading = useSelector((state) => state.adminAuth.isLoading);

    useEffect(() => {
        dispatch(getAllUsers());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const handleEdit = (userId, name, email) => {
        const newName = prompt('Enter new name:', name);
        const newEmail = prompt('Enter new email:', email);

        if (newName && newEmail) {
            dispatch(editUser({ userId, name: newName, email: newEmail }));
        }
    };

    const handleBlock = (userId) => {
        if (window.confirm('Are you sure you want to block this user?')) {
            dispatch(UserBlock(userId));
        }
    };

    const handleUnBlock = (userId) => {
        if (window.confirm('Are you sure you want to unblock this user?')) {
            dispatch(UserUnBlock(userId));
        }
    };

    const logout = () => {
        dispatch(AdminLogout())
        navigate("/login")

    }

    return (
        <div>
            <button className='btn' onClick={logout}>Logout</button>
            <h2>User List</h2>
            {isLoading && <p>Loading...</p>}
            {users && users.length > 0 ? (
                users.map((user) => (
                    <div key={user._id}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>User Status: {user.isBlock ? 'Blocked' : 'Unblocked'}</p>
                        <form style={{display:'flex', justifyContent:'center', gap: '10px'}}>
                            <div className="form-group">
                                <button onClick={() => handleEdit(user._id, user.name, user.email)} className='btn'>Edit</button>
                            </div>
                            <div className="form-group">
                                <button onClick={() => handleBlock(user._id)} className='btn'>Block</button>
                            </div>
                            <div className="form-group">
                                <button onClick={() => handleUnBlock(user._id)} className='btn'>Unblock</button>
                            </div>
                        </form>
                    </div>
                ))
            ) : (
                <p>No users available.</p>
            )}
        </div>
    );
};

export default UserList;
