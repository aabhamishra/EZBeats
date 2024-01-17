import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import loginStateContext from '../../contexts/SamplerLoginStateContext';
import { useNavigate } from 'react-router-dom';

export default function SamplerRegister() {

    // TODO Create the register component.
    const [newUsername, setNewUsername] = useState("");
    const [newUserPW, setNewUserPW] = useState("");
    const [newRPUserPW, setRPNewUserPW] = useState("");
    const [isLogin, setIsLogin] = useContext(loginStateContext);

    const navigate = useNavigate();

    const register = () => {
        if (newUsername === "" || newUserPW === "") {
            alert("You must provide both a username and password!")
        }
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: newUsername,
                password: newUserPW
            })
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully registered')
                setIsLogin(1);
                navigate("/editor")
                return res.json();
            } else if (res.status === 400) {
                alert("You have to specify a username has not already been taken! And a password!");
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

    return <>
        <h1>Register</h1>

        <Form>
            <Row>
                <Col md={20}>
                    <Form.Label htmlFor="Username">Username</Form.Label>
                    <br />
                    <Form.Control
                        id='Username'
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={20}>
                    <Form.Label>Passsword</Form.Label>
                    <br />
                    <Form.Control
                        type='password'
                        id='Password'
                        value={newUserPW}
                        onChange={(e) => setNewUserPW(e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={20}>
                    <Form.Label>Confirm your Passsword</Form.Label>
                    <br />
                    <Form.Control
                        type='password'
                        id='RepeatPassword'
                        value={newRPUserPW}
                        onChange={(e) => setRPNewUserPW(e.target.value)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={10}>
                    <Button variant='primary'
                        onClick={register}>
                        Register
                    </Button>
                </Col>
            </Row>
        </Form>
    </>

}