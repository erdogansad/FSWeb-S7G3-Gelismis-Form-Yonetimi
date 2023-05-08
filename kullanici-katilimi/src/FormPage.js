import React, { useEffect, useState } from 'react'
import { Row, Col, Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap";
import * as Yup from 'yup';

const FormPage = ({formSubmit}) => {
  const [formData, setFormData] = useState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          tos: false
        }),
        [formErrors, setFormErrors] = useState({
          fname: "",
          lname: "",
          email: "",
          password: "",
          tos: ""
        }),
        [formIsValid, setFormValid] = useState(),
        [isSubmitted, setSubmitted] = useState();

  const userSchema = Yup.object().shape({
    fname: Yup.string().required("Lütfen geçerli bir ad girin"),
    lname: Yup.string().required("Lütfen geçerli bir soyad girin"),
    email: Yup.string().email("Lütfen geçerli bir e-posta girin").required("Lütfen bir e-posta adresi girin"),
    password: Yup.string().min(6, "Şifreniz 6 karakterden fazla olmalı").max(12, "Şifreniz 12 karakterden az olmalı"),
    tos: Yup.boolean().oneOf([true], "Kullanım Şartları'nı kabul etmelisiniz.")
  });

  const inputChange = e => {
    const {name, value, type, checked} = e.target;
    let val = type === "checkbox" ? checked : value;
    Yup.reach(userSchema, name).validate(val)
    .then(() => setFormErrors({...formErrors, [name]: ""}))
    .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}));
    setFormData({...formData, [name]: val});
  }

  useEffect(() => {
    userSchema.isValid(formData)
    .then(valid => setFormValid(valid));
  }, [formData, userSchema])

  return (
      <Form className='mx-auto w-50 border p-4' onSubmit={e => formSubmit(e, formData, resp => setSubmitted(resp))}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="fname">Ad</Label>
              <Input id="fname" name="fname" placeholder="Ad" onChange={inputChange} type="text" value={formData.fname} invalid={!!formErrors.fname} data-test-id="isim"/>
              {formErrors.fname && <FormFeedback> {formErrors.fname} </FormFeedback>}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="lname">Soyad</Label>
              <Input id="lname" name="lname" placeholder="Soyad" onChange={inputChange} type="text" value={formData.lname} invalid={!!formErrors.lname} data-test-id="soyisim"/>
              {formErrors.lname && <FormFeedback> {formErrors.lname} </FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="email">E-posta</Label>
              <Input id="email" name="email" placeholder="E-posta" onChange={inputChange} type="email" value={formData.email} invalid={!!formErrors.email} data-test-id="eposta"/>
              {formErrors.email && <FormFeedback> {formErrors.email} </FormFeedback>}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input id="password" name="password" placeholder="••••••••" onChange={inputChange} type="password" value={formData.password} invalid={!!formErrors.password} data-test-id="sifre"/>
              {formErrors.password && <FormFeedback> {formErrors.password} </FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check>
              <Input id="tos" name="tos" type="checkbox" onChange={inputChange} value={formData.tos} invalid={!!formErrors.tos} data-test-id="tos"/>
              {' '}
              <Label check>Kullanım Şartları'nı kabul ediyorum.</Label>
              {formErrors.tos && <FormFeedback> {formErrors.tos} </FormFeedback>}
            </FormGroup>
          </Col>
        </Row>
        <Row className='pt-3'>
          {isSubmitted && <p className='text-success text-center' data-test-id="successText"> Kullanıcı kaydedildi. </p>}
          <Col className='text-center'><Button type="submit" disabled={!formIsValid} color='success'>Gönder</Button></Col>
        </Row>
      </Form>
  )
}

export default FormPage