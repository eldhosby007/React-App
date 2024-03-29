import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";

const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalblog,
}) => {
  const renderPagination = () => {
    if (
      (currentPage === 0 && data.length < 5) ||
      (totalblog === pageLimit && currentPage === 0)
    )
      return null;
    if (currentPage === 0) {
      return (
        <MDBPagination center className="md-0" style={{marginBottom:"50px"}}>
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => loadBlogsData(5, 10, 1)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (
      currentPage < pageLimit - 1 &&
      data.length === pageLimit &&
      totalblog - data.length !== pageLimit
    ) {
      return (
        <MDBPagination center className="md-0" style={{marginBottom:"50px"}}>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage + 1) * 5, (currentPage + 2) * 5, 1)
              }
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="md-0" style={{marginBottom:"50px"}}>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              onClick={() =>
                loadBlogsData((currentPage - 1) * 5, currentPage * 5, -1)
              }
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return <div>{renderPagination()}</div>;
};

export default Pagination;
