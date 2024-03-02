import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCol,
  MDBTypography,
  MDBRow,
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Badge from "../components/Badge";
import { toast } from "react-toastify";

const Blog = () => {
  const [blog, setblog] = useState();
  const [relatedpost, setrelatedpost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingledata();
    }
  }, [id]);

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };

  const getSingledata = async () => {
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    const relatedpostdata = await axios.get(
      `http://localhost:5000/blogs?category=${response.data.category}&_start=0&_end=3`
    );
    if (response.status === 200 || relatedpost.status === 200) {
      setblog(response.data);
      setrelatedpost(relatedpostdata.data);
    } else {
      toast.error("somethging went wrong");
    }
  };
  const styleInfo = {
    display: "inline",
    marginleft: "5px",
    float: "right",
    margintop: "7px",
  };
  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong className="mt-3" style={{ float: "left", color: "black" }}>
          Go back
        </strong>
      </Link>
      <MDBTypography
        tag="h2"
        className="text-muted mt-2"
        style={{ display: "inline-block" }}
      >
        {blog && blog.title}
      </MDBTypography>
      <img
        src={blog && blog.imageUrl}
        className="img-fluid rounded"
        alt={blog && blog.title}
        style={{ width: "100%", maxHeight: "600px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "#f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3"
            far
            icon="calender-alt"
            size="lg"
          />
          <strong
            style={{ float: "left", marginLeft: "2px", marginTop: "12px" }}
          >
            {blog && blog.date}
          </strong>
          <Badge styleInfo={styleInfo}>{blog && blog.category}</Badge>
        </div>
        <MDBTypography className="lead md-0">
          {blog && blog.description}
        </MDBTypography>
      </div>
      {relatedpost && relatedpost.length > 0 && (
        <>
          {relatedpost.length > 1 && <h1>Related post</h1>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedpost
              .filter((item) => item.id != id)
              .map((item, index) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage
                        src={item.imageUrl}
                        alt={item.title}
                        position="top"
                      ></MDBCardImage>
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{excerpt(item.description)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
};

export default Blog;
