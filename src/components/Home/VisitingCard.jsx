import React, { useRef, useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaShareAlt, FaFacebook, FaLinkedin, FaTwitter, FaGithub, FaBuilding, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Spin, Modal, Button, Input } from 'antd';
import html2pdf from 'html2pdf.js';
import useId from '../../hooks/useId';
import { notify } from '../../utils/Notify';
import imagesA from '../Arjun.pdf'

const VisitingCard = () => {
    const [loading, setLoading] = useState(false);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const cardRef = useRef();
    const userId = useId();
    const url = window.location.href;

    const handleShare = () => {
        setShareModalVisible(true);
    };

    const handleCopyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            setLinkCopied(true);
            notify('success', 'Link copied to clipboard!');
        });
    };

    const handleDownloadPDF = () => {
        const element = cardRef.current;
        setLoading(true);
        try {
            html2pdf()
                .from(element)
                .save(`${userId}.pdf`)
                .then(() => {
                    setLoading(false);
                });
            notify('success', 'Download successful');
        } catch (error) {
            console.error('Error generating PDF:', error);
            notify('error', 'Error generating PDF');
            setLoading(false);
        }
    };

    const goto = (link) => {
        window.location.href = link;
    };

    const data = {
        name: 'Arjun Mehta',
        profile: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png', // Replace with a fictional image URL
        role: 'Business Development Manager',
        company: 'Innovate Solutions Pvt Ltd',
        website: 'https://www.innovatesolutions.com',
        email: 'arjun.mehta@innovatesolutions.com',
        phone: '+911234567890',
        address: '45 Tech Park, Phase 2, Hinjewadi, Pune 411057'
    };

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=Check out this link&body=${encodeURIComponent(url)}`
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="p-6 bg-white shadow-lg dark:shadow-dark rounded-lg dark:bg-gray-900" ref={cardRef}>
                {/* Visiting Card Info */}
                <div className="flex items-center mb-4">
                    <img src={data.profile} alt="Profile" className="w-24 h-24 rounded-full shadow-md object-cover" />
                    <div className="ml-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{data.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{data.role}</p>
                    </div>
                </div>

                {/* Contact Icons */}
                <div className='flex items-center justify-center gap-4'>
                    <div className='flex flex-col items-center gap-1'>
                        <FaPhone
                            className='w-10 h-10 bg-green-500 rounded-full p-2 cursor-pointer text-white'
                            onClick={() => goto(`tel:${data.phone}`)}
                        />
                        <h3>Call</h3>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <FaWhatsapp
                            className='w-10 h-10 bg-green-500 rounded-full p-2 cursor-pointer text-white'
                            onClick={() => goto(`https://wa.me/${data.phone}`)}
                        />
                        <h3>Whatsapp</h3>
                    </div>
                    <div className='flex flex-col items-center gap-1'>
                        <FaEnvelope
                            className='w-10 h-10 bg-green-500 rounded-full p-2  cursor-pointer text-white'
                            onClick={() => goto(`mailto:${data.email}`)}
                        />
                        <h3>E-Mail</h3>
                    </div>
                </div>

                {/* More Info */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="text-gray-800 dark:text-gray-300 space-y-2">
                    <div className="flex items-center gap-2">
                        <FaBuilding /> {data.company}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaGlobe /> <a href={data.website} target="_blank" rel="noopener noreferrer">{data.website}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEnvelope /> <a href={`mailto:${data.email}`}>{data.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhone /> <a href={`tel:${data.phone}`}>{data.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt /> {data.address}
                    </div>
                </div>

                {/* Social Icons */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-center gap-4 text-2xl">
                    <FaFacebook className="text-blue-600 cursor-pointer" onClick={() => goto('https://www.facebook.com/innovatesolutions')} />
                    <FaLinkedin className="text-blue-700 cursor-pointer" onClick={() => goto('https://www.linkedin.com/innovatesolutions')} />
                    <FaTwitter className="text-blue-400 cursor-pointer" onClick={() => goto('https://www.twitter.com/innovatesolutions')} />
                    <FaInstagram className="text-pink-500 cursor-pointer" onClick={() => goto('https://www.instagram.com/innovatesolutions')} />
                    <FaYoutube className="text-red-500 cursor-pointer" onClick={() => goto('https://www.youtube.com/innovatesolutions')} />
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-300 my-4"></div>
                <div className="flex justify-between">
                    <button onClick={handleShare} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
                        <FaShareAlt className="inline mr-2" /> Share
                    </button>
                    <a href={imagesA} target='_blank' >Download</a>
                    {/* <button onClick="./Arjun.pdf" className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
                        {loading ? <Spin /> : 'Download'}
                    </button> */}
                </div>

                {/* Share Modal */}
                <Modal
                    title="Share Visiting Card"
                    visible={shareModalVisible}
                    onCancel={() => setShareModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setShareModalVisible(false)}>Close</Button>
                    ]}
                >
                    <p>Share this link:</p>
                    <Input value={url} readOnly />
                    <Button onClick={handleCopyLink} type="primary" className="mt-2">
                        {linkCopied ? 'Link Copied!' : 'Copy Link'}
                    </Button>

                    <div className="flex justify-between flex-wrap mt-4 gap-2">
                        <Button
                            icon={<FaWhatsapp className="text-green-500" />}
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            WhatsApp
                        </Button>
                        <Button
                            icon={<FaFacebook className="text-blue-600" />}
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </Button>
                        <Button
                            icon={<FaLinkedin className="text-blue-700" />}
                            href={shareLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </Button>
                        <Button
                            icon={<FaTwitter className="text-blue-400" />}
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </Button>
                        <Button
                            icon={<FaEnvelope className="text-red-500" />}
                            href={shareLinks.email}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Email
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default VisitingCard;
