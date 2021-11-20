import { useState, useEffect } from 'react';

    const useInfo = url => {
        const [Info, setInfo] = useState([]);
        useEffect(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => setInfo(data))
        }, []);
        return Info;
    };

export default useInfo;