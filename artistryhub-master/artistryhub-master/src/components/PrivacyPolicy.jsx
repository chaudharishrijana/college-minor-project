import React from 'react';

const PrivacyPolicy = () => {
    document.title = 'Art Gallery | Privacy Policy';
    return (
        <div className="privacy-policy my-10 min-h-[700px]">
            <p className={`text-4xl font-semibold py-5`}>Privacy Policy</p>
            <p className={`text-lg font-semibold py-3   `}>
                Last Updated: February 19, 2024
            </p>
            <p className={`py-3`}>
                Artistry Hub ("we," "us," or "our") operates the website artistryhub, an online platform dedicated to
                the sale and promotion of art and related products. This Privacy Policy outlines our practices regarding
                the collection, use, and disclosure of personal information when you use our services and the choices
                you have associated with that information.
            </p>
            <p className={`py-3`}>

                By accessing or using our Site, you agree to the terms of this Privacy Policy. If you do not agree with
                the terms of this Privacy Policy, please do not access or use our Site.
            </p>
            <p className={`text-lg font-semibold py-3`}>Information Collection and Use</p>
            <p className={`py-3`}>
                We collect several types of information for various purposes to provide and improve our services to you.
            </p>
            <ul>
                <li><strong>Personal Information</strong>: When you register an account, make a purchase, or interact
                    with our Site, we may collect personally identifiable information such as your name, email address,
                    postal address, phone number, and payment information.
                </li>


            </ul>
        </div>
    );
}

export default PrivacyPolicy;
