import { useParams } from 'react-router-dom';

const Contact = () => {
    const { id } = useParams();

    const getUrl = () => {
        console.log(id);
    };

    return (
        <>
            <p>{id}</p>
            <button onClick={getUrl}>send</button>
        </>
    );
};

export default Contact