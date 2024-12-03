
import { useState } from 'react';
import Modal from './Modal';  // Make sure to import the Modal component

export default function DownloadReportForm() {
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        designation: '',
        email: '',
        phone1: '',
        phone2: '',
        hearAboutUs: '',
        postcode: ''
    });

    const [modalMessage, setModalMessage] = useState(''); // State to store the message for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [isLoading, setIsLoading] = useState(false); // State to control loading status

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);  // Set loading to true when the form is submitted

    //     try {
    //         const response = await fetch('/api/services', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             setModalMessage(data.message);  // Set success message
    //         } else {
    //             setModalMessage(`Error: ${data.message}`);  // Set error message
    //         }
    //     } catch (error) {
    //         setModalMessage('An unexpected error occurred. Please try again.');  // Set general error message
    //     } finally {
    //         setIsLoading(false);  // Set loading to false when the request completes
    //         setIsModalOpen(true);  // Open the modal
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);  // Set loading to true when the form is submitted
    
        try {
            // Send data to the first API: '/api/services'
            const response1 = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data1 = await response1.json();
    
            // Send data to the second API: 'http://localhost:5000/api/submit'
            const response2 = await fetch('https://vbackk.vercel.app/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data2 = await response2.json();
    
            // Handle responses from both APIs
            if (response1.ok || response2.ok) {
                setModalMessage(data1.message);
            } else if (!response1.ok) {
                setModalMessage(`Error in /api/services: ${data1.message}`);
            } else if (!response2.ok) {
                setModalMessage(`Error in /api/submit: ${data2.message}`);
            }
    
        } catch (error) {
            setModalMessage('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);  // Set loading to false when the request completes
            setIsModalOpen(true);  // Open the modal
        }
    };
    

    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* Form fields remain unchanged */}
                <div className='flex flex-wrap lg:flex-nowrap justify-between lg:gap-5'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={formData.name}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <label>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            placeholder="Name Of Organization*"
                            value={formData.organization}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        />
                    </div>
                </div>

                <div className='flex flex-wrap lg:flex-nowrap justify-between lg:gap-5'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <label>Designation</label>
                        <input
                            type="text"
                            name="designation"
                            placeholder="Designation*"
                            value={formData.designation}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address*"
                            value={formData.email}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        />
                    </div>
                </div>

                <div className='flex flex-wrap lg:flex-nowrap justify-between lg:gap-5'>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone1"
                            placeholder="Phone Number*"
                            value={formData.phone1}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full lg:w-1/2'>
                       
                    </div>
                </div>

                <div className='flex w-full'>
                    <div className='flex flex-col w-full lg:w-full'>
                        <label>How did you hear About us</label>
                        <select
                            name="hearAboutUs"
                            value={formData.hearAboutUs}
                            onChange={handleChange}
                            className="text-black border w-full border-gray-200 p-2 rounded-md my-2"
                            required
                        >
                            <option value="">Select an option</option>
                            <option value="Conference">Conference</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Referral</option>
                            <option value="Google search">Google search</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>

               
            </div>

                         <button type="submit" className='bg-[#1567E0] rounded-full' style={{ marginTop: '20px', padding: '10px', color: 'white', border: 'none', }}>
                {isLoading ? 'Processing...' : 'Click here to download report'}
            </button>

            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
        </form>
    );
}
