import { Button } from '@material-ui/core';
import { useState } from 'react';
import Link from 'next/link'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/link'


const axios = require('axios').default;

function Signup() {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const createAccount = async (values) => {
        values.name = values.name.toLowerCase();
        try {
            const res = await axios('../api/user/auth', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(values)

            })
            setSuccess(true);
        } catch (error) {
            setError("Entered Email already exists!!!")

            console.log(error);
        }

    }
    const formik = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: '',
            salt: '',

        },

        validationSchema: Yup.object({

            name: Yup.string()
                .min(3, 'Must be 3 character or more')
                .max(50, 'Must be 50 characters or less')
                .required('Required'),

            email: Yup.string().email('Invalid email address').required('Required'),
            age: Yup.number().min(12, 'Age must be greater than 12').required('Required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')

                .required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')


        }),

        onSubmit: values => {
            setError(null)
            setSuccess(null)
            createAccount(values);
            formik.resetForm({
                values: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    age: '',
                    salt: '',

                }
            })

        },

    });

    return <div className='border h-auto bg-gradient-to-b from-black to-[#013374] w-[400px] flex flex-col' onMouseMove={() => {
        setError(null)
        setSuccess(null)
    }}>
        <Link href={"/"}>
            <img src="https://firebasestorage.googleapis.com/v0/b/instagram-a0c6d.appspot.com/o/PODFAST%20LOGO%20Transperency%20-%200.gif?alt=media&token=fe98c4fa-7a6b-47fb-a1c0-69a6486681ba"
                className='object-contain m-3'
            />
        </Link>
        <div className='m-3' >
            <h1 className='text-white text-4xl  mb-0 font-bold text-center'>Create Account</h1>
            <p className='text-white mt-0 text-center mb-3'>Or    <Link href="/login"><a className="text-[#5d6cfa]">Login</a></Link></p>
        </div>
        <form className='flex flex-col p-4' onSubmit={formik.handleSubmit}>
            <label className='ml-2 text-white'>Name:</label>
            <input className='m-2' type="text" placeholder='Enter your Name'
                id="name" required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name} />
            {formik.touched.name && formik.errors.name ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.name}</p>) : null}

            <label className='ml-2 text-white'>Age:</label>
            <input className='m-2' type="number" placeholder='Enter your Age'
                id="age"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.age}</p>) : null}


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

            <label className='ml-2 text-white'>Confirm Password:</label>
            <input className='m-2' id="confirmPassword" type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                placeholder='Re-enter your Password' />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.confirmPassword}</p>) : null}
            {error == null ? null : (<p className="text-base text-red-700  text-center">{error}</p>)}
            {success == null ? null : (<p className="text-base text-green-500  text-center">Successfully created new account</p>)}
            <Button type="submit" className='m-2 mt-5' variant='contained' color='primary'>Create Account</Button>
        </form>

    </div>;
}

export default Signup;
