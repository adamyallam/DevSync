import TopBar from 'src/components/navbar/TopBar'
import Footer from 'src/components/footer/Footer'
import DropMenu from '@/components/navbar/DropMenu'
import Contact from '@/components/contact/Contact'

const contact = () => {
    return (
        <div>
            <TopBar />
            <DropMenu />
            <Contact />
            <Footer />
        </div>
    )

}

export default contact