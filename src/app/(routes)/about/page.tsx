import About from 'src/components/about/About'
import Footer from 'src/components/footer/Footer'
import TopBar from 'src/components/navbar/TopBar'

const about = () => {
    return (
        <div>
            <TopBar />
            <About />
            <Footer />
        </div>
    )
}

export default about