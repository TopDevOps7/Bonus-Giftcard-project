import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import CustomOutlinedInput from "components/CustomOutlinedInput/CustomOutlinedInput";
import * as Yup from "yup";

import { getEmailResultRequest, getEmailResultResponse, getEmailResultResponse_ } from "redux/actions/home";
import Button from "components/CustomButtons/Button";
import useStyles from "./style";
import img_mail from "../../assets/img/Grupo 159.svg";
import img_mail_ from "../../assets/img/Grupo 160.svg";

const Mail = () => {
  const { partnerId, userId, uuid } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailResult = useSelector(({ home }) => home.emailResult);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disableBtn, disableButton] = useState(false);
  const [resultStatus, setResultStatus] = useState(false);
  const [min, setMin] = useState(2);
  const [sec, setSec] = useState("00");

  useEffect(() => {
    console.log(emailResult, "emailResult");
    emailResult && emailResult.gift && setName(emailResult.gift.name);
    emailResult && emailResult.gift && setEmail(emailResult.gift.email);
    localStorage.getItem("emailStatus") == "sending" && (setResultStatus(true), countTime());
  }, [emailResult]);

  useEffect(() => {
    dispatch(getEmailResultRequest(partnerId, userId, uuid, navigate));
    localStorage.setItem("resultStatus", "");
  }, [partnerId]);

  const countTime = () => {
    let now = new Date().getTime();
    let countDownDate = now + 121000;
    localStorage.setItem("emailStatus", "sending");

    // Update the count down every 1 second
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSec(Math.floor((distance % (1000 * 60)) / 1000));

      // If the count down is over, write some text
      if (distance < 100) {
        clearInterval(x);
        setMin(2);
        setSec("00");
        setResultStatus(false);
        localStorage.setItem("emailStatus", "");
        window.location.reload();
      }
    }, 1000);
  };

  const handleButtonClick = () => {
    disableButton(true);
    dispatch(getEmailResultResponse(partnerId, userId, uuid, navigate)).then(() => {
      localStorage.getItem("resultStatus") == "success" && (disableButton(false), setResultStatus(true), countTime());
      localStorage.setItem("resultStatus", "");
    });
  };

  const handleSubmit = (values) => {
    const { email } = values;
    disableButton(true);
    dispatch(getEmailResultResponse_(partnerId, userId, uuid, email, navigate)).then(() => {
      localStorage.getItem("resultStatus") == "success" && (disableButton(false), setResultStatus(true), countTime());
      localStorage.setItem("resultStatus", "");
    });
  };

  const getValidationSchema = () => {
    let validation = {
      email: Yup.string().email("El Email debe ser válido.").max(60).required("El Email no puede estar vacío."),
    };

    return Yup.object(validation);
  };

  return (
    <div className={classes.root}>
      {emailResult && emailResult.gift && emailResult.gift.statusMail == "received" && resultStatus == false && (
        <div>
          <img src={img_mail} draggable={false} className={classes.img_mail} />
          <div className={classes.hr_center}>
            <hr className={classes.hr_style} />
          </div>
          <div className={classes.txt_content_width}>
            <span className={classes.txt_content}>La tarjeta de regalo para </span>
            <span className={classes.txt_content}>{name}</span>
            <span className={classes.txt_content_bold}> sí se entregó al mail</span>
            <span className={classes.txt_content}> que nos compartiste</span>
          </div>
          <div className={classes.margin_top_30}>
            <span className={classes.txt_content_bold}>{email}</span>
          </div>
          <div className={classes.margin_top_150}>
            <span className={classes.txt_content_sub}>¿Quieres reenviar al correo?</span>
          </div>
          <div className={classes.margin_top_30}>
            <Button id="para-button-" color="primary" disabled={disableBtn} onClick={() => handleButtonClick()}>
              REENVIAR CORREO
            </Button>
          </div>
        </div>
      )}
      {emailResult && emailResult.gift && emailResult.gift.statusMail == "bounce" && resultStatus == false && (
        <div>
          <img src={img_mail} draggable={false} className={classes.img_mail} />
          <div className={classes.hr_center}>
            <hr className={classes.hr_style} />
          </div>
          <div className={classes.txt_content_width}>
            <span className={classes.txt_content}>La tarjeta de regalo para </span>
            <span className={classes.txt_content}>{name}</span>
            <span className={classes.txt_content_bold}> no se pudo entregar</span>
            <span className={classes.txt_content}> al correo que nos compartiste</span>
          </div>
          <div className={classes.margin_top_30}>
            <span className={classes.txt_content_bold}>{email}</span>
          </div>
          <div className={classes.margin_top_30}>
            <span className={classes.txt_content_bold}>Favor de verificar</span>
          </div>
          <Formik
            isInitialValid={false}
            initialValues={{
              // email: emailResult.gift.email,
              email: "",
            }}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, isValid }) => {
              return (
                <Form>
                  <div className={classes.hr_center}>
                    <CustomOutlinedInput
                      size="small"
                      type="text"
                      label="Email"
                      value={values.email}
                      name="email"
                      error={touched.email && errors.email}
                      maxLength={60}
                      block
                    />
                  </div>
                  <div className={classes.margin_top_50}>
                    <span className={classes.txt_content_sub}>¿Quieres reenviar al correo?</span>
                  </div>
                  <div className={classes.margin_top_30}>
                    <Button id="para-button" color="primary" type="submit" disabled={!isValid || disableBtn}>
                      REENVIAR CORREO
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
      {emailResult && emailResult.gift && emailResult.gift.statusMail == null && <div></div>}
      {resultStatus == true && (
        <div>
          <span className={classes.success_tittle}>ENVIADO</span>
          <div className={classes.margin_top_30}>
            <img src={img_mail_} draggable={false} className={classes.img_mail_} />
          </div>
          <div className={classes.margin_top_30}>
            <span>
              Si quieres volver a intentar espera {min}:{sec}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mail;
