import { useState } from 'react';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Report has been sent to your email!');
        } else {
            alert('Failed to send the report.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div >
                <div className='flex justify-between gap-5'>
                    <div className='flex flex-col w-1/2'>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                <div className='flex flex-col w-1/2'>
                <label>Organization</label>
                <input
                    type="text"
                    name="organization"
                    placeholder="Name Of Organization*"
                    value={formData.organization}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                </div>



                <div className='flex justify-between gap-5'>
                <div className='flex flex-col w-1/2'>
                <label>Designation</label>
                <input
                    type="text"
                    name="designation"
                    placeholder="Designation*"
                    value={formData.designation}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                <div className='flex flex-col w-1/2'>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
</div>


<div className='flex justify-between gap-5'>
<div className='flex flex-col w-1/2'>
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone1"
                    placeholder="Phone Number*"
                    value={formData.phone1}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                <div className='flex flex-col w-1/2'>
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phone2"
                    placeholder="Phone Number*"
                    value={formData.phone2}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                </div>


                <div className='flex w-full'>
                <div className='flex flex-col w-full'>
                <label>How did you hear About us</label>

                <input
                    type="text"
                    name="hearAboutUs"
                    placeholder="How Did You Hear About Us*"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                    required
                />
                </div>
                </div>
                <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode / Zip*"
                    value={formData.postcode}
                    onChange={handleChange}
                    required
                    className="text-black border border-gray-200 p-2 rounded-md my-2"

                />
            </div>
            <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Click here to download report
            </button>
        </form>
    );
}
