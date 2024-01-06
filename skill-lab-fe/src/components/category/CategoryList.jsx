
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Category from './Category'
import CategoryCreateForm from './CategoryCreateForm';
import CategoryEditForm from './CategoryEditForm';

export default function CategoryList() {

  // added after proxy and restart npm start
  const [category, setCategory] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});


  useEffect(() => {
    //Call API

    loadCategoryList();

  }, []) // [] Are the list of dependencies needed


  const loadCategoryList = () => {
    Axios.get("/category/index", setHeader())
      .then((response) => {
        console.log(response)
        setCategory(response.data.categories)

      })
      .catch((err) => {
        console.log(err);
      })
  }


  const setHeader = ()=> {
    const authheader = {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    return authheader;
  };
  const addCategory = (category) => {
    Axios.post("/category/add", category,{
        headers: {
          "Content-Type": "multipart/form-data"
          }
      })
      .then(res => {
        console.log("Category Added Successfully !!!", res.data);
        loadCategoryList();
      })
      .catch(err => {
        console.log("Error Adding Category");
        console.log(err);
      })
  }


  const editView = (id) => {
    Axios.get(`/category/edit?id=${id}`, setHeader())
    .then ((res) => {
        console.log(res.data.category);
        console.log("Loaded Category Information");
        let category = res.data.category;
        setIsEdit(true)
        setCurrentCategory(category);
    })
      .catch (err => {
      console.log("Error Adding Category");
      console.log(err);
    })
  }

  const deleteCategory = (id) => {
    Axios.delete(`/category/delete?id=${id}`, setHeader())
    .then(res => {
        console.log("Record deleted Successfullyyy !!");
        console.log(res);
        loadCategoryList();
    })
    .catch(err => {
        console.log("Error deleting Category");
        console.log(err);
    })  
  }
  const updateCategory = (category) => {
    Axios.put("/category/update", category, {
      headers: {
        "Content-Type": "multipart/form-data"
        }
    })
    .then(res => {
        console.log("Category Updated Successfullyyy !!");
        console.log(res);
        loadCategoryList();
        setIsEdit(false);
    })
    .catch(err => {
        console.log("Error Updating Category");
        console.log(err);
    })  
}
console.log(category);
const allcategory = category.map((category) => (
  <tr key={category._id}>
    <Category {...category} editView={editView} deleteCategory={deleteCategory} />

  </tr>
))

  return (
    <div>
       {/* {(!isEdit) ?
      <CategoryCreateForm addCategory = {addCategory}></CategoryCreateForm>
        :
        <CategoryEditForm key={currentCategory._id} category={currentCategory} updateCategory={updateCategory} ></CategoryEditForm>
      } */}
      <h2 className='text-center mt-4'>Category List</h2>
      <div className='row d-flex justify-content-center align-items-center text-center table table-bordered mb-2'>
      <div className='col-md-7 '>
        <table className="table table-stripes table mt-4 table border-top">
          <tbody>
            <tr>
              <th>Category Name</th>
              <th>Category Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {allcategory}
          </tbody> 
        </table>
       </div>
      </div>


      {(!isEdit) ?
      <CategoryCreateForm addCategory = {addCategory}></CategoryCreateForm>
        :
        <CategoryEditForm key={currentCategory._id} category={currentCategory} updateCategory={updateCategory} ></CategoryEditForm>
      }
    </div>
  )
}
