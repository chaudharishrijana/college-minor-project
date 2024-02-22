import React from 'react';

const TermsOfUse = () => {
    document.title = 'Art Gallery | Terms of Use';
    return (
        <div className="terms-of-use my-10 min-h-[700px]">
            <h1 className="text-4xl font-semibold py-5">Terms of Use</h1>
            <p className="text-lg font-semibold py-3">Last Updated: February 19, 2024</p>
            <p className="py-3">
                Artistry Hub ("we," "us," or "our") welcomes you to our website, artistryhub, and its related services.
                By accessing or using our website, you agree to comply with and be bound by the following terms and
                conditions
                of use, which together with our privacy policy govern Artistry Hub's relationship with you in relation
                to this website.
                If you disagree with any part of these terms and conditions, please do not use our website.
            </p>
            <h2 className="text-lg font-semibold py-3">1. Acceptance of Terms</h2>
            <p className="py-3">
                By accessing this website, you are agreeing to be bound by these website terms and conditions of use,
                all applicable laws and regulations, and agree that you are responsible for compliance with any
                applicable local laws.
                If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
            <h2 className="text-lg font-semibold py-3">2. Use License</h2>
            <p className="py-3">
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Artistry Hub's website for personal,
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and
                under this license you may not:
            </p>
            <ul className="list-disc pl-6">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose, or for any public display (commercial or
                    non-commercial);
                </li>
                <li>attempt to decompile or reverse engineer any software contained on Artistry Hub's website;</li>
                <li>remove any copyright or other proprietary notations from the materials; or</li>
                <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p className="py-3">This license shall automatically terminate if you violate any of these restrictions and
                may be terminated by Artistry Hub at any time.
                Upon terminating your viewing of these materials or upon the termination of this license, you must
                destroy any downloaded materials in your possession
                whether in electronic or printed format.
            </p>
            {/* Add more sections as needed */}
        </div>
    );
}

export default TermsOfUse;
