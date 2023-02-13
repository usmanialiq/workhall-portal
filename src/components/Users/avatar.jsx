import React, { useState } from 'react';
import ProfileUploadImg from '../../assets/placeholder.png';

function CustomImageUploader({ getImage, img }) {
    const [image, setImage] = useState({ preview: "", raw: "" });
    const myImage = img.length ? img : ProfileUploadImg;

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
            });
        }
    };

    const handleImage = () => {
        getImage(image.raw);
    };

    return (
        <div className='image-uploader row align-items-center'>
            <label htmlFor='upload-image-btn'>
                {image.preview ? (
                    <img
                        src={image.preview}
                        className='img-fluid rounded-circle'
                        width={106}
                        height={106}
                        alt='Profile Upload PH'
                    />
                ) : (
                    <img
                        src={myImage}
                        className='rounded-circle'
                        width={80}
                        height={80}
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