
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
    Axios.get("/category/index")
      .then((response) => {
        console.log(response)
        setCategory(response.data.categories)

      })
      .catch((err) => {
        console.log(err);
      })
  }


  const setHeader = ()=> {
    // const authheader = {
    //   headers: {
    //     "Authorization": "Bearer " + localStorage.getItem("token")
    //     }
    // }
    // return authheader;
  };
  const addCategory = (category) => {
    Axios.post("/category/add", category, setHeader())
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
    Axios.get(`/category/edit?id=${id}`)
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
    Axios.put("/category/update", category, setHeader())
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
      <h1>Category List</h1>
      <div>
        <table className="table table-stripes">
          <tbody>
            <tr>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {allcategory}
          </tbody> 
        </table>
      </div>
      {(!isEdit) ?
      <CategoryCreateForm addCategory = {addCategory}></CategoryCreateForm>
        :
        <CategoryEditForm key={currentCategory._id} category={currentCategory} updateCategory={updateCategory} ></CategoryEditForm>
      }
    </div>
  )
}
