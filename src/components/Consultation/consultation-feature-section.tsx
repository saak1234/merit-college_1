import { GraduationCap, ClipboardList, User, MessageCircle } from "lucide-react";
import GlobalButton from "../ui/global-button";

const ConsultationFeatureSection = () => {
    const features = [
        {
            icon: <GraduationCap className="text-white w-10 h-10" />,
            title: "Academic Guidance",
            description: "Personalized advice for your educational goals.",
            link: "#",
        },
        {
            icon: <ClipboardList className="text-white w-10 h-10" />,
            title: "Application Assistance",
            description: "Step-by-step support for applications and documentation.",
            link: "#",
        },
        {
            icon: <User className="text-white w-10 h-10" />,
            title: "One-on-One Counseling",
            description: "Expert counselors to guide you through the process.",
            link: "#",
        },
        {
            icon: <MessageCircle className="text-white w-10 h-10" />,
            title: "Live Chat Support",
            description: "24/7 support to answer all your queries.",
            link: "#",
        },
    ];

    return (
        <section className="bg-secondary-green2 text-white py-16">
            <div className="container mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl text-green-shade font-bold">Why Choose Our Consultation?</h2>
                    <p className="text-green-shade mt-4">
                        We provide comprehensive guidance tailored to your academic journey.
                    </p>
                </div>
                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-green-800 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 text-center"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            {feature.description && (
                                <p className="text-sm mb-4">{feature.description}</p>
                            )}
                            <GlobalButton
                                // href={feature.link}
                                // className="text-green-200 hover:text-white font-semibold flex items-center"
                            >
                                Learn More &rarr;
                            </GlobalButton>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConsultationFeatureSection;
