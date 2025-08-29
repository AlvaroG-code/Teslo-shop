export const sleep = (secons: number = 1) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, secons * 1000);
    });
};
