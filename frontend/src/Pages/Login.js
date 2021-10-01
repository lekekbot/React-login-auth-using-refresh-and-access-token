//login.js

import React, { useContext } from "react";
import axios from 'axios';

//imports
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { TokenContext } from "../context/TokenContext";

export default function Login() {
    let { token, setToken } = useContext(TokenContext)
    const { register, handleSubmit } = useForm();
    let history = useHistory()

    const onSubmit = (data) => {
        
        axios.post(`http://localhost:8003/api/authenticate`, {
            email: data.email,
            password: data.password
        }, {withCredentials: true})
        .then(response => {
            setToken(response.data.token)
            history.push('/dashboard')
        })
        .catch(error => console.log(error))
    }

    return (
        <Container>
            <Row><Col><h1>Login</h1></Col></Row>
            <Row>
                {/* Form */}
                 <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    {/* email */}
                    <Form.Group >
                        <Form.Label >Email: </Form.Label>
                        <Form.Control
                             type="email"
                             placeholder="email@email.com"
                             {...register("email", {
                                required: {
                                    value: true,
                                    message: "Please enter your email address",
                                },
                            })}
                    />
                    </Form.Group>
 
                    {/* password */}
                    <Form.Group >
                        <Form.Label >Password: </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Please enter password",
                                },
                            })}
                        />
                    </Form.Group>
 
                    {/* submit button */}
                    <Button
                        type="submit"
                        variant="flat"
                        id="login"
                    >Login</Button>
                </Form>
            </Row>
        </Container>
    )
}
