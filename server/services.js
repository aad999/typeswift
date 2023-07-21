exports.get_couples = async (num) => {
    const api_path = "https://random-word-api.herokuapp.com/word?length=2&number=" + num;
    const response = await fetch(api_path);
    const jsonResponse = await response.json();
    return jsonResponse;
}

exports.get_words = async (num) => {
    const api_path = "https://random-word-api.herokuapp.com/word?number=" + num;
    const response = await fetch(api_path);
    const jsonResponse = await response.json();
    return jsonResponse;
}

exports.get_quotes = (num) => {
    const request = require('request');
    return new Promise((resolve, reject) => {
        request.get({
            url: 'https://api.api-ninjas.com/v1/quotes?limit=' + num,
            headers: {
                'X-Api-Key': 'xqN2IiLXwzEDYsK1ht8OCQ==E4nr60HV1ZkC8SgS'
            },
        }, (err, resp, body) => {
            if (err) {
                reject(err);
            } else if (resp.statusCode !== 200) {
                reject(new Error('Error: ' + resp.statusCode + ' ' + body.toString('utf8')));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
};