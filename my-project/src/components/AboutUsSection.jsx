import React from 'react';

export const AboutUsSection = () => {
    const content = [
        {
            title: "Our Story",
            description: "At Flavor Voyage, we are passionate about bringing unique flavors from around the world to your table. Our journey began with a simple idea: to create a dining experience that transports our guests to distant lands through the magic of taste."
        },
        {
            title: "Our Mission",
            description: "Our chefs meticulously craft each dish to capture the essence of its origin, using authentic ingredients and traditional cooking methods. Whether you crave the bold spices of Indian curry, the delicate flavors of Japanese sushi, or the comforting warmth of Italian pasta, we have something to tantalize every palate."
        },
        {
            title: "Join Us",
            description: "Join us on a culinary adventure and explore the diverse flavors of the world with Flavor Voyage."
        }
    ];

    return (
        <section className={`about-us-section h-screen flex justify-center items-center bg-black text-white py-24 px-4 `}>
            <div className="container mx-auto">
                {content.map((item, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-4xl font-bold mb-4 overflow-hidden text-[#eba000] ">
                            {item.title.split('').map((char, index) => (
                                <span
                                    key={`${char}-${index}`}
                                    className="animate-text-reveal inline-block"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </h2>
                        <p className="text-lg leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AboutUsSection;
