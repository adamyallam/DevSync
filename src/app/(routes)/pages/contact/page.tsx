import Link from "next/link";
import { Linkedin, Github } from 'lucide-react'
import { FaXTwitter } from 'react-icons/fa6'; 

const contact = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20" style={{ padding: '20px' }}>
            <h1 className="text-3xl text-primary-text">Contact</h1>
            <p className="text-center text-primary-text">If you have any questions, feel free to reach out to me through any of the following methods:</p>

            <div className="flex flex-col items-center justify-center scale-[1.5] mt-20">
                <h2 className="text-2xl text-primary-text">Email</h2>
                <p className="text-lg text-primary-text">hello@adamyallam.com</p>
                <div className="flex gap-4 items-center justify-center mt-5">
                    <Link className="text-primary-text hover:scale-105 hover:text-blue-400 transition-all duration-300" href={'https://www.linkedin.com/in/adamyallam/'}><Linkedin size={30} /></Link>
                    <Link className="text-primary-text hover:scale-105 hover:text-blue-400 transition-all duration-300" href={'https://x.com/adamallam__'}><FaXTwitter size={30} /></Link>
                    <Link className="text-primary-text hover:scale-105 hover:text-blue-400 transition-all duration-300" href={'https://github.com/adamyallam'}><Github size={30} /></Link>
                </div>
            </div>
        </div>
    )
}

export default contact