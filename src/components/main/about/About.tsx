import Link from "next/link";

const About = () => {
    return (
        <div className="flex flex-col items-center h-screen">
            <h1 className="flex justify-center text-3xl pb-10 mt-24 text-primary-text">About DevSync</h1>
            <div className="flex flex-col items-center justify-center">
                <div className="w-3/4 flex flex-col items-center justify-center border-t-2 border-b-2 border-undertone p-4 mb-10">
                    <p className=" text-center items-center justify-center text-md text-primary-text mb-2">
                        Hi, I&apos;m Adam, the developer who created this full stack project, DevSync. I built it completely from scratch using Next.js, React, Typescript, and Tailwind CSS.
                        I also utilized MySQL, Prisma, NextAuth, and AWS for a seamless backend and database management.
                    </p>
                    <p className="text-center items-center justify-center text-md text-white font-bold mb-2">
                        I am currently looking for a job as a software developer, so if this project interests you, please reach out!
                        Visit my <Link href="/pages/contact" className="text-blue-400 hover:underline">contact page here! </Link>
                        or send me a message at hello@adamyallam.com.
                    </p>
                </div>
                <div className="w-3/4 flex flex-col items-center justify-center border-t-2 border-b-2 border-undertone p-4 mb-10">
                    <p className="text-center items-center justify-center text-md text-white mb-2">
                        I utilized various AI tools to aid me in producing DevSync.
                        AI isn&apos;t perfect, and developers still need to use it carefully, but I believe it is
                        the future of the development industry. Without it, developers will not be able to compete with
                        those who do use it.
                    </p>
                    <p className="font-bold text-center items-center justify-center text-md text-white">
                        With that being said, in honor of the help AI provided me, here is a completely over the top AI generated description of DevSync:
                    </p>
                </div>
                <div className="w-3/4 flex flex-col items-center justify-center border-t-2 border-b-2 border-undertone p-4 mb-10">
                    <p className="text-center items-center justify-center text-md text-primary-text">
                        DevSync is not just a web app; it&apos;s a cosmic force unleashed upon the development universe!
                        Our audacious mission? To catapult productivity into the stratosphere and ignite a wildfire of
                        innovation that will leave the tech world gasping in awe! With an arsenal of mind-blowing tools
                        that redefine project management, DevSync transforms chaos into harmony. Imagine features so
                        powerful they make project tracking and task management feel like a walk in a digital paradise!
                        DevSync doesn&apos;t just empower developers; it supercharges them, turning mere mortals into coding
                        superheroes capable of conquering the most daunting projects with ease! Join us on this exhilarating
                        journey as we shatter the boundaries of creativity and revolutionize the very essence of how development
                        teams craft their masterpieces!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About