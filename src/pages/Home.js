import { useSelector } from "react-redux";


function HomePage () {

    const authInfo = useSelector(state => state.auth.user);

    return <h1>
        This is the Home Page;
        <br/>
        {authInfo ? authInfo.uid : 'no user :('}
        <br/>
        {authInfo?.email}
        <br/>
        {authInfo?.username}

    </h1>

};

export default HomePage;

