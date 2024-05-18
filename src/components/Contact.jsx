import { useParams } from 'react-router-dom';
import SendMessage from './SendMessage';

const Contact = () => {
    const { id } = useParams();

    const getUrl = () => {
        console.log(id);
    };

    return (
        <>
            <SendMessage/>
        </>
    );
};

export default Contact