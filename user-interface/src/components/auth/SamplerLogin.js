import React, { useState, useContext } from "react";
import loginStateContext from "../../contexts/SamplerLoginStateContext";
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function SamplerLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useContext(loginStateContext);

    const login = () => {
        if (username === "" || password === "") {
            alert("You must provide both a username and password!");
            return
        } else {

            fetch('http://localhost:8080/login', {
                method: 'POST',
                credentials: `include`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(res => {
                if (res.status === 200) {
                    alert('Successfully logged in');
                    setIsLogin(1);
                    navigate('/editor');
                    return res.json();
                } else if (res.status === 400) {
                    alert("Incorrect username or password!");
                    return res.json();
                } else if (res.status === 404) {
                    alert("User not found");
                    return res.json();
                } else {
                    throw new Error()
                }
            }).then(json => {
                console.log(json().body);
            }).catch(e => {
                console.error(e);
            })
        }
    }

    return <>
        <h1>Login</h1>
        <Form>
            <Row>
                <Col md={12}>
                    <Form.Label htmlFor="Username">Username</Form.Label>
                    <br />
                    <Form.Control
                        id='Username'
                        onChange={(e) => setUsername(e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={12}>
                    <Form.Label>Passsword</Form.Label>
                    <br />
                    <Form.Control
                        type='password'
                        id='Password'
                        onChange={(e) => setPassword(e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={3}>
                    <Button variant='primary'
                        onClick={login}>
                        Login
                    </Button>
                </Col>
            </Row>

        </Form>
    </>
}