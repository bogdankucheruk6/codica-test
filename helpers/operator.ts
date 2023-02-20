export default (value: number): string => {
    if (value > 0) {
        return '+';
    }

    return '';
};