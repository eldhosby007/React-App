import React, { useEffect, useState } from "react";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

//a1km2rgo

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};
const options = ["Travel", "Food", "Fashion", "Sports", "Tech", "Fitness"];

const AddEditBlog = () => {
  const [formvalue, setFormvalue] = useState(initialState);
  const [categoryErrmsg, setcategoryErrmsg] = useState(null);
  const [editMode, seteditMode] = useState(false);
  const { title, description, category, imageUrl } = formvalue;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      seteditMode(true);
      getSingledata(id);
    } else {
      seteditMode(false);
      setFormvalue({ ...initialState });
    }
  }, [id]);

  const getSingledata = async (id) => {
    const singleblog = await axios.get(`http://localhost:5000/blogs/${id}`);
    if (singleblog.status === 200) {
      setFormvalue({ ...singleblog.data });
    } else {
      toast.error("something went wrong");
    }
  };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setcategoryErrmsg("Please select Category");
    }
    const imageValidation = !editMode ? imageUrl : true;
    if (title && description && category && imageUrl) {
      const currentDate = getDate();
      if (!editMode) {
        const blogUpdateddata = { ...formvalue, date: currentDate };
        const response = await axios.post(
          "http://localhost:5000/blogs",
          blogUpdateddata
        );
        if (response.status === 201) {
          toast.success("blog created successfully!");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        const response = await axios.put(
          `http://localhost:5000/blogs/${id}`,
          formvalue
        );
        if (response.status === 200) {
          toast.success("blog updated successfully!");
        } else {
          toast.error("Something went wrong");
        }
      }
      setFormvalue({ title: "", description: "", category: "", imageUrl: "" });
      Navigate("/");
    }
  };
  const Navigate = useNavigate();

  const onInputchange = (e) => {
    let { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  const onUploadimage = (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "a1km2rgo");
    axios
      .post("http://api.cloudinary.com/v1_1/dtfxwziqx/image/upload", formData)
      .then((resp) => {
        toast.info("Image uploaded successfully!");
        setFormvalue({ ...formvalue, imageUrl: resp.data.url });
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  const onCategorychange = (e) => {
    setcategoryErrmsg(null);
    setFormvalue({ ...formvalue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{editMode ? "Edit blog" : "Add blog"}</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBValidationItem feedback="Please provide a title" invalid>
          <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputchange}
            required
            label="title"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please provide a description" invalid>
          <MDBInput
            value={description || ""}
            name="description"
            type="text"
            onChange={onInputchange}
            required
            label="description"
            textarea
            rows={4}
          />
        </MDBValidationItem>
        <br />
        {!editMode && (
          <>
            <MDBValidationItem feedback="Please upload a image" invalid>
              <MDBInput
                type="file"
                onChange={(e) => onUploadimage(e.target.files[0])}
                required
              />
            </MDBValidationItem>
            <br />
          </>
        )}

        <select
          className="categoryDropdown"
          onChange={onCategorychange}
          value={category}
        >
          <option>Please Select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrmsg && (
          <div className="categoryErrormsg">{categoryErrmsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "15px" }}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "15px" }}
          onClick={() => Navigate("/")}
        >
          Go back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;
