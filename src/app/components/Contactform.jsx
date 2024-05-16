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
        <div className='w-full flex flex-col 2xl:gap-12 gap-9 bg-white border border-gray-200 rounded-md p-9 lg:p-9 2xl:p-20 shadow-md justify-center'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className='flex flex-col'>
          <Field type="text" id="firstName" placeholder="First Name" name="firstName" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="firstName" component="div" className="error" />
        </div>

        <div className='flex flex-col'>
          <Field type="text" id="lastName" placeholder="Last Name" name="lastName" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="lastName" component="div" className="error" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

        <div className='flex flex-col'>
          <Field type="email" id="email" name="email" placeholder="Email" className="input border  border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>

        <div className='flex flex-col'>
          <Field type="text" id="phone" name="phone"placeholder="Phone" className="input border border-gray-200 p-2 rounded-md" />
          <ErrorMessage name="phone" component="div" className="error" />
        </div>
        </div>

    

        <div className="col-span-2">
          <label htmlFor="country"></label>
          <Select
            id="country"
            name="country"
            placeholder="Choose Country"
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
          <label htmlFor="product"></label>
          <Select
            id="product"
            name="product"
            options={products}
            placeholder="Product and Solution"
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
          <Field as="textarea" id="message" placeholder="Message" name="message" rows="4" className="input border border-gray-200 p-2 rounded-md" />
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
