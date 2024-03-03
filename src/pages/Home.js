import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const Home = () => {
  const [data, setData] = useState([]);
  const [latestBlog, setlatestBlog] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [totalBlog, settotalBlog] = useState(null);
  const [pageLimit] = useState(5);
  const options = ["Travel", "Food", "Fashion", "Sports", "Tech", "Fitness"];

  useEffect(() => {
    loadBlogsData(0, 5, 0);
    fetchlatestBlog();
  }, []);

  const loadBlogsData = async (start, end, increase, operation) => {
    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setData(response.data);
      if (operation) {
        setcurrentPage(0);
      }
      setcurrentPage(currentPage + increase);
    } else {
      toast.error("something went wrong");
    }
  };

  //Latest blog data fetching
  const fetchlatestBlog = async () => {
    const totalBlog = await axios.get("http://localhost:5000/blogs");
    settotalBlog(totalBlog.data.length);
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `http://localhost:5000/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setlatestBlog(response.data);
    } else {
      toast.error("something went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        toast.success("Blog deleted successfully");
        loadBlogsData(0, 5, 0, "delete");
      } else {
        toast.error("something went wrong");
      }
    }
  };

  const onInputChange = (e) => {
    console.log("value", e.target.value);
    if (!e.target.value) {
      loadBlogsData();
    }
    setsearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/blogs?title=${searchValue}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("something went wrong");
    }
  };

  const handleCategory = async (category) => {
    const response = await axios.get(
      `http://localhost:5000/blogs?category=${category}`
    );
    if (response.status === 200) {
      setData(response.data);
    } else {
      toast.error("something went wrong");
    }
  };

  console.log("data", data);
  return (
    <>
      <Search
        handleSearch={handleSearch}
        searchValue={searchValue}
        onInputChange={onInputChange}
      />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No data found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data &&
                data.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
          <h4 className="text-start">Latest Post</h4>
          {latestBlog &&
            latestBlog.map((item, index) => (
              <LatestBlog key={index} {...item} />
            ))}
          <Category options={options} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
      <div className="mt-3">
        <Pagination
          currentPage={currentPage}
          loadBlogsData={loadBlogsData}
          pageLimit={pageLimit}
          data={data}
          totalblog={totalBlog}
        />
      </div>
    </>
  );
};

export default Home;
