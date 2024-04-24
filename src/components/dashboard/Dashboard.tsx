import Home from './Home'

export const Dashboard = () => { 

    const page = true;
    
    if (page) {
    return (
        <Home />
    )
    } else {
        return (
            null
        )
    }
}

export default Dashboard