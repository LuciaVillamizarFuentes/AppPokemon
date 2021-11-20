import { useState, useEffect } from 'react';

    const useFilter = url => {
        const [Filters, setFilter] = useState([]);
        useEffect(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => setFilter(data.results))
        }, []);
        return Filters;
    };

export default useFilter;
