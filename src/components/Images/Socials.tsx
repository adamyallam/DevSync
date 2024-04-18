import Image from 'next/image'
import img1 from 'src/assets/imgs/instagram.png'
import img2 from 'src/assets/imgs/twitter.webp'
import img3 from 'src/assets/imgs/linkedin.webp'



export default function Socials() {
    
    return (
    <div className='flex'>
        <Image className="w-12 h-12" src={img1} alt="" />
        <Image className="w-12 h-12" src={img2} alt="" />
        <Image className="w-12 h-12" src={img3} alt="" />
      </div>
    )
}