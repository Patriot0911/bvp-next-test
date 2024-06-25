const customFormatter = (value: any, unit: any) => {
    if (unit === 'minute')
        return `Sync ${value} minutes ago`;
    if (unit === 'second')
        return `Sync less than a minute ago`;
    return `Sync long time ago`;
};

export default customFormatter;
