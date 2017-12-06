
export default function testRequest(url, options) {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve({
                state: true,
            });

        }, 1000);

    }).then(data => {

        console.log(data, 1)
        return data;
    }).catch(err => console.log(err));

}
