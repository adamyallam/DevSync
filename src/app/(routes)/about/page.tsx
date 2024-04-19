import About from 'src/components/about/About'
import Footer from 'src/components/footer/Footer'
import TopBar from 'src/components/navbar/TopBar'
import DropMenu from '@/components/navbar/DropMenu'

const about = () => {
    return (
        <div>
            <TopBar />
            <DropMenu />
            <About />
            <Footer />
        </div>
    )
}

export default about