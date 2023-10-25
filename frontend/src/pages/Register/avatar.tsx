import { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import avatar from "../../components/avatar";

function Avatar({ changeSelection }: any) {
  const [selectAvatar, setSelectAvatar] = useState({
    profilePic: "./imgs/avatars/avatar-1.png",
  });
  changeSelection(selectAvatar);
  const handleClick = (e:any) => {
    const target = e.target as HTMLInputElement;
    let profilePic = target.value;
    setSelectAvatar({profilePic:profilePic})
  };
  return (
    <>
      <Row xs={2} md={2} xlg={6} className="g-4">
        {Array.from(avatar).map((img, index) => {
          return (
            <>
              <Col key={index} className="mb-3">
                <Form>
                  <label htmlFor={`avatar-${index}`}>
                    <img src={img.avatar_img} alt="avatar" />
                  </label>
                  <Form.Check
                    style={{ display: "none" }}
                    label={`avatar-${index}`}
                    name="profilePic"
                    value={img.avatar_img}
                    type="radio"
                    id={`avatar-${index}`}
                    onClick={(e) =>handleClick(e)}
                  />
                </Form>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
}

export default Avatar;
