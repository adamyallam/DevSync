import Image from 'next/image'
import img1 from 'src/assets/imgs/instagram.png'
import img2 from 'src/assets/imgs/twitter.webp'
import img3 from 'src/assets/imgs/linkedin.webp'

type SocialsProps = {
  divClass: string
  imgClass: string
}

const Socials = ({divClass, imgClass}: SocialsProps) => {
    
    return (
    <div className={`${divClass}`}>
        <Image className={`${imgClass}`} src={img1} alt="" />
        <Image className={`${imgClass}`} src={img2} alt="" />
        <Image className={`${imgClass}`} src={img3} alt="" />
      </div>
    )
}

export default Socials