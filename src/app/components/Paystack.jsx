// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import PaystackPop from "@paystack/inline-js";
// import { useCart } from "react-use-cart";
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Confetti from './Confetti';




// const ContactForm = () => {
  // const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  
//   var amount = cartTotal
//   const router = useRouter()
//   const [isVisible, setIsVisible] = useState(false);
//   const pdfUrl = items.pdfUrl;



//   const initialValues = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     amount: cartTotal,
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First Name is required'),
//     lastName: Yup.string().required('Last Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     amount: Yup.number().required('Amount is required').positive('Amount must be positive')
//   });

  // const downloadPdf = () => {
  //   // Construct the URL for the PDF file on localhost
  //   const pdfUrl = `http://localhost:3000/healthReport.pdf`;
    
  //   // Create an anchor element
  //   const anchor = document.createElement("a");
  //   anchor.href = pdfUrl; // Set the href to the PDF URL
  //   anchor.download = "Health-Report.pdf"; // Specify the file name for download
  //   anchor.click(); // Simulate a click event to trigger the download
  // };

//   const payWithPayStack = async (values) => {
//     const { firstName, lastName, email, amount } = values;
//     try {
//       const paystack = new PaystackPop();
//       await paystack.newTransaction({
//         key: "pk_test_9318e98ab42fb6bbad985d8add0158edc26b5973",
//         amount: amount * 100, // Convert amount to kobo (100 kobo = 1 Naira)
//         email,
//         firstname: firstName, // Use lowercase "firstname" instead of "firstName"
//         lastname: lastName, // Use lowercase "lastname" instead of "lastName"
//         onSuccess(transaction) { // Correct the spelling to "onSuccess"
          // let message = `Payment Complete! Reference ${transaction.reference}`;
          // alert(message);
          // router.push("/pages/congrats")
          // downloadPdf(); // Call the function with parentheses to execute it
          // emptyCart()

//         },
//         onClose() { // Correct the spelling to "onClose"
//           alert("You have cancelled the transaction");
//         }
//       });
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       await payWithPayStack(values);
//       //console.log('Payment successful');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5">
//       <h1>Contact Information</h1>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form>
//             <div className="flex flex-col gap-10">
//               <div className="flex gap-5">
//                 <div className="flex flex-col gap-2 w-1/2">
//                   <label htmlFor="firstName">First Name</label>
//                   <Field
//                     type="text"
//                     name="firstName"
//                     className="w-full p-2 rounded-md border border-black"
//                   />
//                   <ErrorMessage name="firstName" component="div" className="text-red-500" />
//                 </div>
//                 <div className="flex flex-col gap-2 w-1/2">
//                   <label htmlFor="lastName">Last Name</label>
//                   <Field
//                     type="text"
//                     name="lastName"
//                     className="w-full p-2 rounded-md border border-black"
//                   />
//                   <ErrorMessage name="lastName" component="div" className="text-red-500" />
//                 </div>
//               </div>
//               <div className="flex gap-5">
//                 <div className="flex flex-col gap-2 w-1/2">
//                   <label htmlFor="email">Email</label>
//                   <Field
//                     type="text"
//                     name="email"
//                     className="w-full p-2 rounded-md border border-black"
//                   />
//                   <ErrorMessage name="email" component="div" className="text-red-500" />
//                 </div>
//                 <div className="flex flex-col gap-2 w-1/2">
//                   <label htmlFor="amount">Amount  ($)</label>
//                   <Field
//                     type="number"
//                     name="amount"
//                     className="w-full p-2 rounded-md border border-black"
//                     value = {cartTotal}
//                     disabled
//                   />
//                   <ErrorMessage name="amount" component="div" className="text-red-500" />
//                 </div>
//               </div>
//               {/* Add more fields for email and phone number */}
//             </div>
//             <button
//               type="submit"
//               className="bg-[#1567E0] p-3 rounded-md text-white my-9 w-full"
//               disabled={isSubmitting}
//             >
//   {isSubmitting ? 'Submitting...' : `Payment $${cartTotal}`}
//             </button>

           


//           </Form>
//         )}
//       </Formik>

//        </div>
//   );
// };

// export default ContactForm;


"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/CheckoutStripe";
import { useCart } from "react-use-cart";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
    const {items, isEmpty, totalUniqueItems, totalItems, cartTotal, updateItemQuantity, removeItem, emptyCart} = useCart()  

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "../components/CheckoutStripe";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// export default function Home() {
//   return (
//     React.createElement(Elements, { stripe: stripePromise }, React.createElement(PaymentForm))
//   );
// }
