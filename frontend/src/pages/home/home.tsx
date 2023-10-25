import Footer from "../../components/footer/footer";
import OffcanvasNavbar from '../../components/nav/navbar'
import { Col, Row, Container } from 'react-bootstrap';
import Task from '../todolist/task';
import Record from "../record/record";
import {changeBodyBackground} from '../../components/utils'
// import Hero from "../../components/Hero"/

const HomePage = () => {
  changeBodyBackground();
  return (
      <div className="home-main">
        <OffcanvasNavbar />
        <Container className="w-50 mt-5 home-form">
          <Row>
            <Col md={12} >
              <Record />
              <Task />
            </Col>
          </Row>
        </Container>
        <Row>
        <Footer />
        </Row>
    </div>
  );
};

export default HomePage;
