import { Button } from '@material-ui/core'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useStateValue } from '../../redux/StateProvider';
import * as Yup from 'yup';
import axios from 'axios';


function Upload() {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [{ user }, dispatch] = useStateValue();
    const upload = async (values) => {
        try {
            console.log(values)
            const res = await axios('../api/podcast/upload', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(values)

            })
            console.log(res);
            runBackendServer(res.data.id)
            setSuccess(true);
            


        } catch (error) {

            console.log(error)
            setError("Unable to upload podcast");
        }

    }
    const formik = useFormik({

        initialValues: {
            _id : '',
            title: '',
            creatorID: user._id,
            creators: '',
            img: '',
            url: '',
            tags: '',
        },

        validationSchema: Yup.object({

            title: Yup.string().required('Required'),
            creators: Yup.string().required('Required'),
            tags: Yup.string().required('Required'),
            
            url: Yup.string().required('Required'),


        }),

        onSubmit: values => {
            setError(null)
            setSuccess(null)
            const finalValues = {
                
                title: values.title.toLowerCase(),
                creatorID: values.creatorID,
                creatorNames: values.creators.split(","),
                img: values?.img,
                url: values.url,
                tags: values.tags.split(" "),
                _id: ""
            }
            upload(finalValues);
            formik.resetForm({
                values: {
                    title: '',
                    creatorID: user._id,
                    creators: '',
                    img: '',
                    url: '',
                    tags: '',


                }
            })

        },

    });

const runBackendServer = async(id) => {
    let url = 'http://localhost:8000/podcastsummarizer/summary/'+id;
    const djangores = await axios.get(url)
    console.log(djangores.data)
}
    return (
        <div className='text-white' onClick={() => {
            setError(null)
            setSuccess(null)
        }}>
            <p className='font-bold text-3xl mt-2 text-center'>Upload Podcast</p>
            <form className='flex flex-col text-center items-center text-black' onSubmit={formik.handleSubmit}>
                <div className='flex flex-col  mt-3 text-left' >
                    <label className='ml-2 mr-2 text-white '>Title:</label>
                    <input className='m-2 w-[300px]' type="text" id="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        placeholder='Enter Podcast Title' />
                    {formik.touched.title && formik.errors.title ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.title}</p>) : null}

                </div>
                {/* <div className='flex flex-col text-left mt-3' >
                    <label className='ml-2 mr-2 text-white'>Caption:</label>
                    <input className='m-2 w-[300px]' type="text" id="caption"
                        placeholder='Enter Caption' />
                </div> */}
                <div className='flex flex-col text-left mt-3' >
                    <label className='ml-2 mr-2 text-white'>Author Names:</label>
                    <input className='m-2 w-[300px]' type="text" id="creators"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.creators}
                        placeholder="Enter Creator names seperated by ',' " />
                    {formik.touched.creators && formik.errors.creators ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.creators}</p>) : null}

                </div>

                <div className='flex flex-col text-left mt-3' >
                    <label className='ml-2 mr-2 text-white'>Tags:</label>
                    <input className='m-2 w-[300px]' type="text" id="tags"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.tags}
                        
                        placeholder='Enter space seperated tags' />
                </div>
                <div className='flex flex-col text-left mt-3' >
                    <label className='ml-2 mr-2 text-white'>Podcast:</label>
                    <input className='m-2 w-[300px]' type="text" id="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        placeholder='Enter file location of podcast' />
                    {formik.touched.url && formik.errors.url ? (<p className="text-sm text-red-700 mr-2 text-right">{formik.errors.url}</p>) : null}
        
                </div>

                <div className='flex flex-col text-left mt-3' >
                    <label className='ml-2 mr-2 text-white'>Image:</label>
                    <input className='m-2 w-[300px]' type="text" id="img"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.img}
                        placeholder='Enter file location of image' />
                </div>
                {error == null ? null : (<p className="text-base text-red-700  text-center">{error}</p>)}
                {success == null ? null : (<p className="text-base text-green-500  text-center">Podcast Uploaded successfully, it will go live as soon as summary is generated</p>)}

                <Button type="submit" className='m-2 mt-5' variant='contained' color='secondary'>Upload Podcast</Button>



            </form>
            {/* <Button onClick = {check} type="submit" className='m-2 mt-5' variant='contained' color='secondary'>BACKEND</Button> */}


        </div>
    )
}

export default Upload