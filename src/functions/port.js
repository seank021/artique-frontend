export const getPort = () => {
    const isDev = true;
    const DEV_PORT = "http://3.39.145.210:8080";
    const PROD_PORT = "http://3.39.145.210";

    return isDev ? DEV_PORT : PROD_PORT;
};
