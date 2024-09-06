
import bg from '../../../assets/images/bg-landing.jpg';
import Card from '../../atoms/card/card';

const LandingBody: React.FC = () => {
    return (
        <div className="relative w-full h-screen flex overflow-hidden ">
            {/* Background Image */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%', // Adjust the vertical position
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px)' // Apply a blur effect
                }}
            />
            {/* Content */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center select-none p-8">
                <div className="relative z-10 bg-blue-400 bg-opacity-80 rounded-lg shadow-lg p-8 max-w-3xl text-center mb-8">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Welcome to MyDocs
                    </h1>
                    {/* Description */}
                    <p className="text-lg  text-white mb-6">
                        MyDocs is your ultimate document creation and collaboration tool, inspired by Google Docs. Create, edit, and share documents in real-time with your team, all from the comfort of your browser.
                    </p>
                </div>
                {/* Key Features */}
                <div className="relative z-10 flex flex-wrap justify-center space-x-4">
                    <Card innerText="Work on documents simultaneously with your team." outerText="Real-Time Collaboration:" />
                    <Card innerText="Enjoy a full-fledged editor with text formatting, images, tables, and more." outerText="Rich Text Editing:" />
                    <Card innerText="Keep track of document changes and revert to previous versions if needed." outerText="Version Control:" />
                    <Card innerText="Share documents with specific people or make them public with secure links." outerText="Secure Sharing:" />
                    <Card innerText="Access and edit your documents from any device, anytime." outerText="Cross-Platform:" />
                </div>
            </div>
        </div>
    );
}

export default LandingBody;
