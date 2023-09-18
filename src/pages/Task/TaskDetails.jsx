import {useEffect, useState} from 'react';
import {gitHubApiCall} from '../../GitHubGetRequest.jsx';
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function TaskDetails({selectedUrl}) {
    const [itemData, setItemData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await gitHubApiCall(selectedUrl);
                setItemData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(() => console.log('done'));
    }, [selectedUrl]);


    if (!itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Go Back</button>
            <h2>{itemData.name}</h2>
            <pre>
                <code>{itemData.content}</code>
            </pre>
        </div>
    );
}
