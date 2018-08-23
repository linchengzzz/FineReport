const express = require('express');
const axios = require('axios');
const app = express();
// 初始化时间
const date = new Date();
const endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
const startTime = `${date.getFullYear()}-${date.getMonth() + 1}-01`

const server = app.listen(3000, function() {
    console.log('------======服务开启======------');
    console.log('------    监听端口:3000   ------');
    console.log('------    请求:post      ------');
    console.log('------==================------');
});

/**
 * h5页面登录
 */
app.get('/h5login', (req, res) => {
    const params = {
        measures: [{ event_name: '$AppClick', aggregator: 'general' }],
        unit: 'day',
        by_fields: ['event.$AppClick.$screen_name'],
        sampling_factor: 64,
        axis_config: { isNormalize: false, left: [], right: [] },
        from_date: startTime,
        to_date: endTime,
        tType: 'n',
        ratio: 'n',
        approx: false,
        filter: {},
        detail_and_rollup: true,
        request_id: '1534472851486:288406',
        use_cache: true,
        limit: 20
    };
    axios({
        method: 'post',
        url:
            'http://101.201.72.160:8007/api/events/report/?format=json&token=48e9a680bf4636f38d8b07cfcbd3e17bdb2e4962cade3701ff54367b13067433&project=production',
        data: {
            ...params
        }
    }).then(data => {
        res.send(data.data)
    });
});
