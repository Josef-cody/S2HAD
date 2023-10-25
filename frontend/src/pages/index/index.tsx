import { useState, useEffect,useContext } from "react";
import { useForm } from "react-hook-form";
import { Col, Row, Container, Navbar,Form,Modal } from 'react-bootstrap'
import { useUserLogin } from '../../hooks/security/auth'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { contextData } from '../../contextApi'
import MySpinner from '../../components/spinner/Spinner'
import Footer from '../../components/footer/footer';
import Register from '../Register/register'

function Index () {
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);
    const handleCloseSignUp = () => setShowSignUp(false);
    const handleShowSignUp = () => setShowSignUp(true);
   
    const { setUserData } = useContext(contextData);
    const { data, mutate, isSuccess, isError, isLoading } = useUserLogin();
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (dataOnSubmit:{}) => {
        mutate(dataOnSubmit)
    };
    useEffect(() => {
        if (isSuccess) {
            setUserData(data);
            localStorage.setItem('Access_token',data.accessToken)
            toast(data.msg)
            navigate('/secure')
        } else if (isError) {
            toast("Wrong password or email!")
        } else return;
    }, [isSuccess, isError]);
    if (isLoading) {
        return <div>{<MySpinner/>}</div>;
    }
    return <>
     <Navbar className="nav justify-content-end me-3" fixed="top">
        <Row>
            <Col lg={9} md={9} sm={12} xs={12}>
            <Form  onSubmit={handleSubmit(onSubmit)}>
            <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
            <Form.Group >
                    <Form.Control
                        className="mb-2"
                        placeholder="Enter email"
                        type="text"
                        {...register("email")}
                    />
                </Form.Group>
            </Col>
          <Col lg={4} md={4} sm={6} xs={6}>
          <Form.Group >
                    <Form.Control
                        className="mb-2"
                        placeholder="Password"
                        type="password"
                        {...register("password")}
                    />
            </Form.Group>
          </Col>
          <Col lg={4} md={4} sm={12} xs={12}>
            <button type="submit" className='mainButton w-100 mb-2'>Login</button>
          </Col>
        </Row>
        </Form>
            </Col>
            <Col lg={3} md={3} sm={12} xs={12}>
                <button
                      className="mainButton w-100 pt-2 pb-2"
                      onClick={handleShowSignUp}
                      >Sign up!</button>
             </Col>
        </Row>
    </Navbar>
    <Container>
        <section id='top'>
        <Row className="section-odd">
            <Col xl={6} lg={6} md={7} sm={12}>
                <div className="hero-container mt-5">
                    <img  className="hero-img" src="./img/hero-img.png" alt="hero-image"/>
                </div>
            </Col>
            <Col xl={6} lg={6} md={5} sm={12}>
                <h1 className='index-h1 mt-4'>Where did all the time go?</h1>
                <h4 className='index-h5h4 mt-5'>Lyubishchev Time management</h4>
                <h5 className='index-h5h4 mb-5'>Visualize your time</h5>
                <button className='mainButton mt-3 mb-4'><a className="text-light" href='#learn-more'>Learn more</a></button>
            </Col>
        </Row>
        </section>
        <section className="section-container" id='learn-more'>
        <Row className="section">
            <Col xl={6} lg={6} md={5} sm={12}>
                <p className='index-p'>WHO IS HE?</p>
                <h1 className='index-h1 mb-5'>About Lyubishchev</h1>
                <h5 className='index-h5h4 mb-5'>
                Alexander Alexandrovich Lyubishchev (April 5, 1890 - August 31, 1972) 
                was a Soviet entomologist, philosopher, and mathematician. 
                Throughout his lifetime, he published more than 70 academic works and 
                wrote a total of 12,500 typewritten pages, an impressive number even for 
                a professional writer.
                </h5>
                <h5 className='index-h5h4 mb-5'>
                At the age of 26, he pioneered a method called "Time Statistics," 
                where he recorded the time spent on each event and used statistical 
                analysis to create monthly and yearly summaries. By doing so, 
                he aimed to improve his work methods, plan future tasks, and ultimately 
                enhance his time management efficiency. He continuously refined this 
                statistical approach, using it for 56 years until his passing.
                </h5>
            </Col>
            <Col xl={6} lg={6} md={7} sm={12}>
                <div className="hero-container">
                    <img  className="author" src="./img/lyubish.png" alt="hero-image"/>
                </div>
            </Col>
        </Row>
        </section>
        <section>
        <Row className="section-odd pt-5">
            <Col xl={6} lg={6} md={7} sm={12}>
            <p className='index-p'>Lyubishchev Time management</p>
                <h1 className='index-h1 mb-5'>Key Points</h1>
            </Col>
            <Col xl={6} lg={6} md={5} sm={12} className='order-list'>
                <Row className='mt-4'>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>1</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Maintain 
                    the authenticity and accuracy of time records. Authenticity means recording 
                    events as they happen, not retroactively. Accuracy requires keeping the margin 
                    of error within 15 minutes; otherwise, the records lose their usefulness.</h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>2</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Do not rely 
                    on memory estimates. Human memory of time, an abstract concept, is highly unreliable.
                    </h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>3</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Select 
                    representative time recording periods. Choose time segments that adequately
                     represent your work patterns and activities.</h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>4</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Adjust time
                     allocation plans promptly. When reviewing time records, identify discrepancies 
                     between planned and actual time spent in the previous period. Use this information 
                     to reassign time allocations for the next period.</h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>5</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Persistence 
                    leads to success. Stay committed to the practice of time statistics for long-term benefits.</h5></Col>
                </Row>
            </Col>
        </Row>
        </section>
        <section>
        <Row className="section pt-5">
        <Col xl={6} lg={6} md={7} sm={12}>
            <p className='index-p'>Lyubishchev Time management</p>
                <h1 className='index-h1 mb-5'>Steps</h1>
            </Col>
            <Col xl={6} lg={6} md={5} sm={12} className='order-list' xs={{span:12,order:12}}>
                <Row className='mt-4'>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>1</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Recording: 
                Use various time tracking cards to accurately 
                record time expenditures. Keep a work log that 
                is both truthful and precise.</h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>2</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Statistics: 
                    After completing each time segment, categorize and tally the time spent on different
                     activities such as meetings, listening to reports, inspecting work, conducting research, 
                     visiting clients, reading, and so on. Create charts or graphs to visualize the proportions 
                     of time spent on each activity.
                    </h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>3</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Analysis: 
                    Compare the time expenditures with the work outcomes and analyze the factors that lead to time wastage. 
                    Common time-wasting factors may include doing tasks that shouldn't be done, doing tasks that others should handle, 
                    engaging in activities that waste others' time, repeating past mistakes, spending too much time in meetings and 
                    managing interpersonal relationships, and so forth.</h5></Col>
                </Row>
                <Row>
                    <Col xl={1} lg={1} md={1} sm={1}><h4 className='index-h5h4 ps-4'>4</h4></Col>
                    <Col xl={11} lg={11} md={11} sm={11}><h5 className='index-h5h4 p-5'>Feedback: 
                    Based on the analysis results, develop a plan to eliminate time-wasting factors and provide 
                    feedback for the next time period. Implement the improvement plan in the subsequent time 
                    segments to continually optimize time utilization.</h5></Col>
                </Row>
            </Col>
        </Row>
        </section>
        <section>
        <Row className="section-odd">
            <Col xl={6} lg={6} md={5} sm={12}>
                <h4 className='index-h5h4 mt-5'>Lyubishchev Time management</h4>
                <h1 className='index-h1 mb-5'>Four Quadrant Model</h1>
                <button className='mainButton mt-3 mb-4'><a className="text-light" href='https://www.marketing91.com/time-management-matrix/'>Learn more</a></button>
            </Col>
            <Col xl={6} lg={6} md={7} sm={12}>
                <div className="hero-container mt-5 mb-5">
                    <img  className="hero-img pt-5 pb-5" src="./img/Four Quadrant Model.webp" alt="hero-image"/>
                </div>
            </Col>
        </Row>
        </section>
        <section>
        <Row className="section-odd reach-out">
            <Col xl={6} lg={6} md={7} sm={12}>
                <div className="hero-container mt-5">
                    <img  className="author" src="./img/reachout.png" alt="hero-image"/>
                </div>
            </Col>
            <Col xl={6} lg={6} md={5} sm={12} className='text-light'>
                <h4 className='index-h5 mt-5 text-start'>Reach out</h4>
                <h5 className='index-h5h4 mb-5 mt-5 text-start'>Josef Abliz</h5>
                <h5 className='index-h5h4 mb-5 text-start'>josef.abliz@gmail.com</h5>
                <div className='mediaIcons'>
                    <div><i className="fa-brands fa-square-facebook icons"></i></div>
                    <div><i className="fa-brands fa-square-instagram icons"></i></div>
                    <div><i className="fa-brands fa-square-twitter icons"></i></div>
                    <div><i className="fa-brands fa-linkedin icons"></i></div>
                </div>
            </Col>
        <Row><a href='#top'><h4 className='index-h5h4 mt-5 text-end'>To top</h4></a></Row>
        </Row>
        </section>
        </Container>
        <Footer />
        <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header>
          <h2>Sign Up</h2>
        </Modal.Header>
        <Modal.Body>
          <Register  />
        </Modal.Body>
      </Modal>
    </>
    
}
export default Index;