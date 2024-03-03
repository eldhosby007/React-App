import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <div className="footer">
    <MDBFooter className='text-center text-lg-left' style={{ backgroundColor: '#541b1b'}}>
      <div className='text-center p-3' style={{color:"#fff"}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text' style={{color:"#fff"}}>
          eldhosby007@gmail.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer
