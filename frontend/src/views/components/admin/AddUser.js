import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CContainer,
  CFormInput,
  CFormCheck,
  CInputGroup,
  CInputGroupText,
  CAlert,
} from '@coreui/react'
import { register } from 'src/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
const AddUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [noMatch, setNoMatch] = useState(false)
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { error, result } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setNoMatch(true)
    } else {
      dispatch(register(name, email, password, isAdmin))
    }
  }
  return (
    <CContainer>
      <div className="flex items-center justify-center mt-10 xs:mb-2">
        <CRow className="justify-content-center">
          <CCol md={8} className="bg-white rounded-lg">
            <CForm className="row m-5 g-3" onSubmit={submitHandler}>
              <CCol md={12}>
                {error && (
                  <CAlert color="danger" style={{ textAlign: 'center' }}>
                    {error}
                  </CAlert>
                )}
              </CCol>
              <CCol md={12}>
                {result && (
                  <CAlert color="success" style={{ textAlign: 'center' }}>
                    {result}
                  </CAlert>
                )}
              </CCol>
              <CCol md={12}>
                <p className="text-gray-800 dark:text-gray-200 text-xl font-bold">Add New User</p>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Username"
                    autoComplete="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Email"
                    autoComplete="user@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </CInputGroup>
                {noMatch && <span className="text-red-500 mb-5">Password not match</span>}
              </CCol>
              <CCol md={6}>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </CInputGroup>
                {noMatch && <span className="text-red-500 mb-5">Password not match</span>}
              </CCol>
              <CCol xs={12}>
                <CFormCheck
                  type="checkbox"
                  id="gridCheck"
                  label="Is Admin"
                  value="true"
                  onChange={(e) => setIsAdmin(e.target.value)}
                />
              </CCol>
              <CRow className="flex items-center justify-center">
                <CCol md={4} xs={8}>
                  <button
                    type="submit"
                    className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Add User
                  </button>
                </CCol>
              </CRow>
            </CForm>
          </CCol>
        </CRow>
      </div>
    </CContainer>
  )
}

export default AddUser
