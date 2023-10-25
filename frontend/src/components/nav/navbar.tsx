import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { useForm } from "react-hook-form";
import {clearBodyBackground} from '../utils'
import jwt_decode from "jwt-decode";
import UserUpdate from '../../pages/user/userUpdate'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';

function OffcanvasNavbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = () => {
    localStorage.clear();
    clearBodyBackground();
    navigate("/");
    queryClient.clear();
  };
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token:any = localStorage.getItem('Access_token');
  const decoded:any = jwt_decode(token);
  const profilePic = decoded.profilePic

  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data:any) => {
    const searchQuery = data.searchQuery
    navigate(`/search-result/${searchQuery}`, { state: searchQuery })
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="navbar-home">
          <Navbar.Brand href="/secure">
            S2HAD
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" role="navigation">
            <Nav className="me-auto">
              <Nav.Link className='text-light' href="/secure/monthly-report">Monthly report</Nav.Link>
              <Nav.Link className='text-light' href="/secure">Annual report</Nav.Link>
            </Nav>
          <Nav className='nav-top-right'>
            <Nav.Link onClick={() => setSmShow(true)}><i className="fa-solid fa-magnifying-glass text-light"></i></Nav.Link>
            <Nav.Link href="#deets"><i className="fa-regular fa-bell text-light"></i></Nav.Link>
            <Nav.Link onClick={handleShow}>
              <picture ><img src={profilePic} alt='user avatar' className='user-avatar' /></picture>
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement='end'
        name='end'
      >
        <Offcanvas.Header className='section'>
          <h6>Logout</h6><i className="fa-solid fa-right-from-bracket me-1" onClick={() => logout()}></i>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserUpdate />
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="search-container">
            <input
              placeholder="Search record by title"
              aria-label="Search record by title"
              aria-describedby="basic-addon2"
              className='searchBar'
              {...register("searchQuery", { required: true, maxLength: 50 })}
            />
            <button className='searchBar-button' type='submit'>Search</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default OffcanvasNavbar;