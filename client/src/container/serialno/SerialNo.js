import React, { useState, useContext } from "react";
import classes from "./SerialNo.css";


const SerialNoApp = React.memo((props) => {
  const passCodeNo = "122020";
  const [passCode, setPassCode] = useState("");
  const [showError, setShowError] = useState(false);
  const authContext = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const buttonClicked = () => {
    if (passCode === passCodeNo) {
      setShowError(false);
      authContext.loginSerialNo();
      props.history.replace("/admin/serialnumber/mainactivity");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className={classes.pageStyling}>
      <h1>Serial Number App</h1>
      <div className={classes.TextBox}>
        <form onSubmit={submitHandler}>
          <TextBox
            iconClasses="fas fa-qrcode"
            inputType="number"
            textboxName="Enter your code....."
            changed={(event) => setPassCode(event.target.value)}
            className={classes.inputStyle}
          />
          <p
            className={
              showError ? classes.errorTextShow : classes.errorTextHide
            }
          >
            *Sai Mã Đăng Nhập / Wrong Passcode
          </p>
          <BlackButton
            content="Log in"
            iconClass="fa fa-arrow-right"
            clicked={buttonClicked}
          />
          <br />
        </form>
      </div>
    </div>
  );
});

export default SerialNoApp;
