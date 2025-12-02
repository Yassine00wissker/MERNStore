import CardDisplay from '../../utils/CardDisplay.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';
import Api from '../../services/Api'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ANaveBar from './ANaveBar.jsx';
import UsersList from './UsersList.jsx';
import Statistics from './Statistics.jsx';
import AdminOrders from './AdminOrders.jsx';
import { Container, Nav, Tab } from 'react-bootstrap';

function Dashboard() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('statistics');
    const { user, logout } = useContext(AuthContext);
    
    useEffect(() => {
        if (!user) {
            // User is not logged in, redirect to login page
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <>
        <ANaveBar user={user} logout={logout} />
        <Container fluid className="mt-4">
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="statistics">📊 Statistics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="orders">🛒 Orders Management</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="users">👥 Users Management</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <Tab.Pane eventKey="statistics">
                        <Statistics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="orders">
                        <AdminOrders />
                    </Tab.Pane>
                    <Tab.Pane eventKey="users">
                        <UsersList />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
        </>
    )
}

export default Dashboard