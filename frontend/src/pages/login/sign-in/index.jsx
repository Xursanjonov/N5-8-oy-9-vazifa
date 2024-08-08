import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useSignInMutation } from '../../../context/api/userApi';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../context/slices/authSlice';
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
    const [newUser, setNewUser] = React.useState({ username: 'john112', password: '12345666' })
    const [signIn, { data, isSuccess }] = useSignInMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (values) => {
        signIn(values)
        console.log(values)
    };
    console.log(data)

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data?.payload?.token))
            dispatch(setUser(data?.payload?.user))
            navigate('/layout/dashboard')
        }
    }, [data])
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <div className='max-sm:p-4 flex items-center justify-center min-h-screen flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>Sign In</h2>
            <Form
                layout="vertical"
                name='basic'
                className='w-96'
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item
                    label="Usename"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input values={newUser.username}
                        onChange={(e) => setNewUser(p => ({ ...p, username: e.target.value }))} placeholder="john111" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password values={newUser.password}
                        onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))} placeholder='12345678' />
                </Form.Item>
                <Form.Item>
                    <Button className='w-full' type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div >
    );
};
export default SignIn;