const geolocation = require('@system.geolocation');
const fetch = require('@system.fetch');
const prompt = require('@system.prompt');

let location = null;
const baiduAK = 'UGM0p4Qn4QTgiGUdYI6F1ZCQETacp43i';

function getCityName() {
    return new Promise(((resolve, reject) => {
        if (location) {
            resolve(location);
        }

        geolocation.getLocation({
            success: function (res) {
                let locationParam = res.latitude + ',' + res.longitude;
                fetch.fetch({
                    url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
                    method: 'GET',
                    success: function (res) {
                        console.log('数据', JSON.parse(res.data).result.addressComponent.city);
                        if (res.code === 200) {
                            location = JSON.parse(res.data).result.addressComponent.city;
                            resolve(location);
                        } else {
                            prompt.showToast({
                                message: '请求出错！错误码：' + res.code
                            });
                            reject(res.code);
                        }
                    },
                    error: function (err) {
                        prompt.showToast({
                            message: '请求出错！错误信息：' + err
                        });
                        reject(err);
                    }
                });
            }
        });
    }));

}

export {
    getCityName
}
