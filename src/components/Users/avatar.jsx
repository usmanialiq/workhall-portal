import React, { useState } from 'react';
import ProfileUploadImg from '../../assets/placeholder.png';

function CustomImageUploader({ getImage, img }) {
    const [image, setImage] = useState({ preview: img ? img : "", raw: "" });
    
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
            <div className='col-3'>
                <label htmlFor='upload-image-btn'>
                    {image.preview ? (
                        <img 
                            src={image.preview} 
                            className='img-fluid' 
                            width={106} 
                            height={109} 
                            alt='Profile Upload PH' 
                        />    
                    ) : (
                        <img 
                            src={ProfileUploadImg} 
                            className='img-fluid' 
                            width={106} 
                            height={109} 
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
            {/* <div className='col-9'>
                <p>Supported formats: JPEG, PNG or GIF <br />
                Max size: 10 MB</p>
            </div> */}
        </div>
    )
}

export default CustomImageUploader;