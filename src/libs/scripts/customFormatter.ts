const customFormatter = (value: any, unit: any) => {
    if (unit === 'minute')
        return `Sync ${value} minutes ago`;
    return `Sync less than a minute ago`;
};

export default customFormatter;
