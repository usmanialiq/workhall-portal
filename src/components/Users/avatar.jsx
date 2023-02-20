import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { users } from '../../config/api-routes';
import ProfileUploadImg from '../../assets/placeholder.png';

function CustomImageUploader({ userId, img }) {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const myImage = img.length ? img : ProfileUploadImg;

    const handleChange = async e => {
        const file = e.target.files;
        if (file.length) {
            setImage({
                preview: URL.createObjectURL(file[0]),
                raw: file[0],
            });
            return handleImage(file[0]);
        }
    };

    const handleImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const { data } = await axios.put(`${users}/image/${userId}`, formData);
            if (data) {
                swal('Good Job!', 'Image uploaded', 'success');
            }
        } catch (error) {
            swal('Failed', error.response.data.message, 'error');
        }
    };

    return (
        <div className='image-uploader'>
            <label htmlFor='upload-image-btn'>
                {image.preview ? (
                    <img
                        src={image.preview}
                        className='rounded-circle'
                        width={106}
                        height={106}
                        alt='Profile Upload PH'
                    />
                ) : (
                    <img
                        src={myImage}
                        className='rounded-circle mb-3'
                        width={150}
                        height={150}
                        alt='Profile Upload PH'
                    />
                )}
            </label>
            <input
                type='file'
                id='upload-image-btn'
                style={{ display: 'none' }}
                onChange={handleChange}
            />
        </div>
    )
}

export default CustomImageUploader;