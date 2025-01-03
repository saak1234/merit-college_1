"use client";
import React, {useState, ChangeEvent, FormEvent} from "react";
import Image from "next/image";
import GlobalButton from "@/components/ui/global-button"
// Define types for the menu items
interface MenuItem {
    title: string;
    content: string;
    image: string;
}

const menuItems: MenuItem[] = [
    {
        title: "How We Teach",
        content:
            "Our teaching philosophy is rooted in the belief that every student has the potential to succeed. We provide a supportive learning environment that encourages curiosity, critical thinking, and creativity.",
        image: "/how-we-teach.jpg",
    },
    {
        title: "Crescent Diploma",
        content:
            "The Crescent Diploma program is designed to prepare students for academic excellence and leadership in post-secondary institutions. It emphasizes a holistic education, combining rigorous coursework with co-curricular activities to build well-rounded individuals.",
        image: "/crescent-diploma.jpg",
    },
    {
        title: "Merrit Diploma",
        content:
            "The Merrit Diploma program is designed to prepare students for academic excellence and leadership in post-secondary institutions. It emphasizes a holistic education, combining rigorous coursework with co-curricular activities to build well-rounded individuals.",
        image: "/merrit-diploma.jpg",
    },
    {
        title: "Upper School",
        content:
            "The Upper School program (Grades 9-12) deepens academic understanding and prepares students for higher education. It offers advanced courses, co-curricular opportunities, and career counseling.",
        image: "/upper-school.jpg",
    },
    {
        title: "Other Course",
        content:
            "The Other Course program is designed to prepare students for academic excellence and leadership in post-secondary institutions. It emphasizes a holistic education, combining rigorous coursework with co-curricular activities to build well-rounded individuals.",
        image: "/other-school.jpg",
    },
];

interface FormData {
    firstName: string;
    lastName: string;
    parentName: string;
    email: string;
    phone: string;
    course: string;
    education: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    parentName?: string;
    email?: string;
    phone?: string;
    course?: string;
    education?: string;
  }
  
const ServiceComponent: React.FC = () => {
    const [activeItem, setActiveItem] = useState<number>(0);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        parentName: '',
        email: '',
        phone: '',
        course: '',
        education: '',
    });

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };
    
    const [errors, setErrors] = useState<FormErrors>({});
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
          } else if (!nameRegex.test(formData.firstName)) {
            newErrors.firstName = 'First name should only contain letters';
          }
        
          if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
          } else if (!nameRegex.test(formData.lastName)) {
            newErrors.lastName = 'Last name should only contain letters';
          }
        
          if (!formData.parentName.trim()) {
            newErrors.parentName = 'Parent name is required';
          } else if (!nameRegex.test(formData.parentName)) {
            newErrors.parentName = 'Parent name should only contain letters';
          }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
    
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
    
        if (!formData.course.trim()) {
          newErrors.course = 'Course is required';
        }
    
        if (!formData.education.trim()) {
          newErrors.education = 'Educational background is required';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        if (name === 'phone') {
          const numbersOnly = value.replace(/[^0-9]/g, '');
          setFormData(prev => ({
            ...prev,
            [name]: numbersOnly
          }));
        }
        else{
          setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
          setErrors(prev => ({ ...prev, [name]: undefined }));
        }
        }
        
      };
    
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
          return;
        }
    
        try {
          const response = await fetch('/api/application', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
          });
          if (response.ok) {
            alert('Application submitted successfully!');
            setFormData({
              firstName: '',
              lastName: '',
              parentName: '',
              email: '',
              phone: '',
              course: '',
              education: ''
            });
            togglePopup();
          } else {
            alert('Failed to submit application');
          }
        } catch (error) {
          console.log(error);
          alert('Error submitting application');
        }
      };

    return (
        <div className="relative z-20">
            <div className="flex flex-col md:flex-row min-h-screen gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                <div className="w-full md:w-1/5 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                  {menuItems.map((item, index) => (
                <button
              key={index}
              className={`cursor-pointer p-4 transition-all text-center font-medium w-full
                  ${
                  activeItem === index
                    ? "bg-green-700 text-white shadow-lg transform scale-105"
              : "bg-gray-300 hover:bg-green-200 hover:shadow-md hover:transform hover:scale-105 text-green-shade"
             }`}
           onClick={() => setActiveItem(index)}
           >
           {item.title}
          </button>
         ))}
      </div>
        <GlobalButton 
          onClick={togglePopup}
        className="w-full"
         >
        Apply Now
       </GlobalButton>
                    {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={togglePopup}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-3/4 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-green-shade mb-4">Application Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.firstName ? 'border-red-500' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.lastName ? 'border-red-500' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Parent&#39;s Name</label>
                <input
                  type="text"
                  name="parentName"
                  placeholder="Enter your parent's name"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.parentName ? 'border-red-500' : ''}`}
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                />
                {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.phone ? 'border-red-500' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Course</label>
                <input
                  type="text"
                  name="course"
                  placeholder="Enter your course"
                  className={`w-full border rounded-lg px-3 py-2 ${errors.course ? 'border-red-500' : ''}`}
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Educational Background</label>
                <textarea
                  className={`w-full border rounded-lg px-3 py-2 ${errors.education ? 'border-red-500' : ''}`}
                  rows={3}
                  name="education"
                  placeholder="Enter your educational background"
                  value={formData.education}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-shade text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
                </div>

                {/* Content Area */}
                <div className="w-full md:w-3/4 shadow-xl rounded-xl mt-4 bg-white h-fit">
                    <h3 className="text-2xl font-extrabold text-white border-b-4 bg-green-700 p-2">
                        {menuItems[activeItem].title}
                    </h3>
                    {/* Dynamic Image */}
                    <div className="relative h-80 sm:h-64 md:h-72 lg:h-80 mb-6 overflow-hidden shadow-lg">
                        <Image
                            src={menuItems[activeItem].image}
                            alt={menuItems[activeItem].title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transform transition-transform duration-500 hover:scale-110"
                        />
                    </div>

                    {/* Dynamic Title and Content */}
                    <div className="p-4">
                        <p className="mt-6 text-green-shade text-lg leading-8">
                            {menuItems[activeItem].content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceComponent;
