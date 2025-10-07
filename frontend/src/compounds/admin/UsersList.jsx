import React from 'react'
import { useEffect } from 'react'
import Api from '../../services/Api'
import { useState } from 'react'
import LoadingPage from '../../services/LoadingPage'

function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                setLoading(true)
                const res = await Api.get('/users');
                setUsers(res.data);
                setError(null);

                const userres = await Api.get('/users/me');
                setCurrentUser(userres.data)

            } catch (err) {
                console.error("Error fetching users:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Failed to fetch users")
            } finally {
                setLoading(false)
            }
        }
        fetchUsers();
    }
        , [])
    const getRoleBadge = (role) => {
        const badges = {
            admin: 'bg-danger',
            seller: 'bg-warning',
            buyer: 'bg-primary'
        }
        return badges[role] || 'bg-secondary'
    }

    const isAdmin = (user) => {
        return user.role === 'admin';
    }

    if (loading) return <LoadingPage />
    if (error) return <div className="alert alert-danger">{error}</div>

    return (
         <div className="container mt-4">
            <h2>Users List</h2>
            {users.length === 0 ? (
                <div className="alert alert-info">No users found</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${getRoleBadge(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {isAdmin(user) ? (
                                            <span className="text-muted">Admin - No actions</span>
                                        ) : (
                                            <>
                                                <button className="btn btn-sm btn-warning me-2">
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UsersList