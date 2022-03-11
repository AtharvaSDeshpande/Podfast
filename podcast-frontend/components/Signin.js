import { Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Router, useRouter } from 'next/router'
import { useStateValue } from '../redux/StateProvider';
import { actionTypes } from '../redux/reducer';
import { setCookies } from 'cookies-next';
const axios = require('axios').default;

function Signin() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [{user},dispatch] = useStateValue();
    const login = async (values) => {
        try {
            console.log(values)
            const res = await axios('../api/user/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(values)

            })
            console.log(res);
            dispatch({
                type: actionTypes.SET_USER,
                user: res.data.user
            })
            setSuccess(true);
            setCookies("user",res.data.user,{maxAge: 36000000,sameSite: true});

            router.push("/");
            

        } catch (error) {
            

            setError("Please enter valid credentials");
        }

    }
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')

                .required('Required'),
            

        }),

        onSubmit: values => {
            setError(null)
            setSuccess(null)
            login(values);
            formik.resetForm({
                values: {
                   
                    email: '',
                    password: '',
                    

                }
            })

        },

    });

    return <div className='border h-auto bg-gradient-to-b from-black to-[#013374] w-[400px] flex flex-col' onClick={() => {
        setError(null)
        setSuccess(null)
    }}>
        <Link href={"/"}>
            <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/PODFAST%20LOGO%20Transperency%20-%200.gif?alt=media&token=fe98c4fa-7a6b-47fb-a1c0-69a6486681ba"
                className='object-contain m-3'
            />
        </Link>
        <div className='m-3' >
            <h1 className='text-white text-4xl  mb-0 font-bold text-center'>Login</h1>
            <p className='text-white mt-0 text-center mb-3'>Or    <Link href="/createaccount"><a className="text-[#5d6cfa]">Create Account</a></Link></p>
        </div>
        <form className='flex flex-col p-4' onSubmit={formik.handleSubmit}>
            <label className='ml-2 text-white'>Email:</label>
            <input className='m-2' type="email" id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder='Enter your Email' />
            {formik.touched.email && formik.errors.email ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.email}</p>) : null}

            <label className='ml-2 text-white'>Password:</label>
            <input className='m-2' id="password" type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder='Enter your Password' />
            {formik.touched.password && formik.errors.password ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.password}</p>) : null}

            {error == null ? null : (<p className="text-base text-red-700  text-center">{error}</p>)}
            {success == null ? null : (<p className="text-base text-green-500  text-center">Successfully Logged in</p>)}
            <Button type="submit" className='m-2 mt-5' variant='contained' color='primary'>Login</Button>
        </form>

    </div>;
}

export default Signin;
