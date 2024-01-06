import React, { useState } from 'react';

export default function CategoryEditForm(props) {
    const [category, setCategory] = useState(props.category);
    // const [image, setImage] = useState("");

    const handleNameChange = (event) => {
        setCategory({ ...category, name: event.target.value });
    }

    const handleAvatarChange = (event) => {
        setCategory({ ...category, avatar: event.target.files[0] });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('_id', category._id);
        data.append('name', category.name);
        data.append('avatar', category.avatar);
        props.updateCategory(data)
        event.target.reset();

        // try {
        //     const response = await fetch('/category/update', {
        //         method: 'PUT',
        //         body: data,
        //     });
        //     const result = await response.json();
        //     console.log('Category Updated Successfully !!!', result);
        //     props.loadCategoryList(); // Update the category list after updating
        // } catch (error) {
        //     console.error('Error Updating Category', error);
        // }
    }

    return (
        <div>
            <h2 className='text-center'>Edit Category</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='col-md-6'>
                        <label>Name</label>
                        <input type='text' value={category.name} className="form-control" onChange={handleNameChange} />
                    </div>
                    <div className='col-md-6'>
                        <label>Avatar</label>
                        <input type='file' className="form-control" onChange={handleAvatarChange} />
                    </div>
                </div>
                <br />
                <div className='row d-flex justify-content-center align-items-center text-center'>
                    <div className='col-md-6'>
                        <input type='submit' className="btn btn-secondary" value="Update Category" />
                    </div>
                </div>
                <br />
            </form>
        </div>
    );
}
