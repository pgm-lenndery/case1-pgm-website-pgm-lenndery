exports.handler = async (event, context) => {
    // URL PARAMETERS
    // const API_PARAMS = qs.stringify(event.queryStringParameters)
    // console.log('API_PARAMS', API_PARAMS)
    console.log(event);
    try {     
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'permalink already exists'
            })
        }
    }
    catch (error) {

    }
};