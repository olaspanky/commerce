"use client"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  organization: Yup.string().required('Organization is required'),
  position: Yup.string().required('Position is required'),
  country: Yup.object().shape({
    label: Yup.string().required('Country is required'),
    value: Yup.string().required('Country is required'),
  }),
  product: Yup.string().required('Product is required'),
  message: Yup.string().required('Message is required'),
});

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  // Add more countries as needed
];

const products = [
  { label: 'Product 1', value: 'product1' },
  { label: 'Product 2', value: 'product2' },
  // Add more products as needed
];

const BeautifulForm = () => {
  const handleSubmit = (values) => {
    // Handle form submission logic
    console.log(values);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        position: '',
        country: null,
        product: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className='w-full flex flex-col 2xl:gap-5 gap-2 bg-white border border-gray-200 rounded-md p-2 lg:p-3 2xl:p-9 shadow-md justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className='flex flex-col'>
          <label htmlFor="firstName">First Name</label>
          <Field type="text" id="firstName" name="firstName" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="firstName" component="div" className="error" />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="lastName">Last Name</label>
          <Field type="text" id="lastName" name="lastName" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="lastName" component="div" className="error" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

        <div className='flex flex-col'>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="phone">Phone</label>
          <Field type="text" id="phone" name="phone" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="phone" component="div" className="error" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

        <div className='flex flex-col'>
          <label htmlFor="organization">Organization</label>
          <Field type="text" id="organization" name="organization" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="organization" component="div" className="error" />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="position">Position</label>
          <Field type="text" id="position" name="position" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="position" component="div" className="error" />
        </div>
        </div>

        <div className="col-span-2">
          <label htmlFor="country">Choose Country</label>
          <Select
            id="country"
            name="country"
            options={countries}
            className="react-select border border-gray-200 p-2 rounded-md"
            classNamePrefix="react-select"
            isSearchable
            onChange={(value) => {
              // Manually set the value for Formik
              setFieldValue('country', value);
            }}
          />
          <ErrorMessage name="country" component="div" className="error" />
        </div>

        <div className="col-span-2">
          <label htmlFor="product">Product and Solution</label>
          <Select
            id="product"
            name="product"
            options={products}
            className="react-select border border-gray-200 p-2 rounded-md"
            classNamePrefix="react-select"
            isSearchable
            onChange={(value) => {
              // Manually set the value for Formik
              setFieldValue('product', value);
            }}
          />
          <ErrorMessage name="product" component="div" className="error" />
        </div>

        <div className="col-span-3 flex flex-col">
          <label htmlFor="message">Message</label>
          <Field as="textarea" id="message" name="message" rows="4" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="message" component="div" className="error" />
        </div>

        <div className="col-span-3">
          <button type="submit" className="btn w-full bg-[#1920D1] p-3 rounded-md  text-white">
            Submit
          </button>
        </div>

        </div>
      </Form>
    </Formik>
  );
};

export default BeautifulForm;
