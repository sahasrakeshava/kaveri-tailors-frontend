import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

const UserProfile = () => {
    const { auth } = useSelector((store) => store);
    const {
        firstName,
        lastName,
        email,
        createdAt,
        address,
    } = auth?.user;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen px-4 py-8 bg-gradient-to-b from-purple-100 to-purple-50"
        >
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-8 mb-8 bg-white border-l-4 border-purple-600 shadow-lg rounded-2xl"
                >
                    <h1 className="mb-6 text-3xl font-bold text-purple-800">Profile Overview</h1>
                    <div className="flex items-center gap-6 mb-8"> {/* Avatar section */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 150 }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgb(147 51 234)',
                                    width: 96,
                                    height: 96,
                                    fontSize: '2.5rem'
                                }}
                                className="border-2 border-purple-200 shadow-lg"
                            >
                                {firstName?.[0]}
                            </Avatar>
                        </motion.div>
                        <div>
                            <h1 className="text-4xl font-bold text-purple-800">
                                {firstName} {lastName}
                            </h1>
                            <p className="mt-1 text-lg text-purple-600">
                                {email}
                            </p>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="p-6 bg-purple-50 rounded-xl"
                        >
                            <h2 className="mb-4 text-xl font-semibold text-purple-700">Personal Information</h2>
                            <div className="space-y-3">
                                <p className="text-purple-900">
                                    <span className="font-medium text-purple-600">Name:</span> {firstName} {lastName}
                                </p>
                                <p className="text-purple-900">
                                    <span className="font-medium text-purple-600">Email:</span> {email}
                                </p>
                                <p className="text-purple-900">
                                    <span className="font-medium text-purple-600">Joined:</span> {new Date(createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="p-6 bg-purple-50 rounded-xl"
                        >
                            <h2 className="mb-4 text-xl font-semibold text-purple-700">Address Details</h2>
                            {address.length > 0 ? (
                                <ul className="space-y-3">
                                    {address.map((addr, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="p-3 text-purple-900 bg-white rounded-lg shadow-sm"
                                        >
                                            {addr}
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="italic text-purple-600"
                                >
                                    No address provided
                                </motion.p>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default UserProfile;