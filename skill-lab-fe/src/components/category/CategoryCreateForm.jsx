import React, { useState } from 'react';

export default function CategoryCreateForm(props) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]);
    }

    const handleSubmit =  (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('avatar', avatar);
        props.addCategory(data)
        event.target.reset()
        
    }

    return (
        <div>
            <h2 className='text-center'>Create Category</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-6'>
                        <label>Category Name</label>
                        <input type='text' className="form-control" value={name} onChange={handleNameChange} />
                    </div>
                    <div className='col-md-6'>
                        <label>Category Avatar</label>
                        <input type='file' className="form-control" onChange={handleAvatarChange} />
                    </div>
                </div>
                <br />
                <div className='row d-flex justify-content-center align-items-center text-center'>
                    <div className='col-md-6'>
                        <input type='submit' className="btn btn-secondary" value="Add Category" />
                    </div>
                </div>
                <br />
            </form>
        </div>
    );
}
