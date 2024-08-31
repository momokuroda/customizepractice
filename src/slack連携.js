(() => {
    'use strict';
    const subdomain = '6ohlffsvudb8.cybozu.com';
    const webhookUrl =
        'https://hooks.slack.com/services/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';
    const fieldCode = '文字列__1行_';
    kintone.events.on('app.record.create.submit', (e) => {
        const thisUrl = `https://${subdomain}/k/${kintone.app.getId()}/show#record=${kintone.app.record.getId()}`;
        const payload = {
            text: `レコード< ${thisUrl} |「 ${e.record[fieldCode].value} 」>が追加されました！`,
        };
        return new kintone.Promise((resolve, reject) => {
            kintone.proxy(
                webhookUrl,
                'POST',
                {},
                payload,
                (body, status, headers) => {
                    console.log(status, body);
                    resolve(e);
                }
            );
        });
        return e;
    });

    kintone.events.on('app.record.process.proceed', (e) => {
        if (e.nextStatus.value === '完了') {
            const thisUrl = `https://${subdomain}/k/${kintone.app.getId()}/show#record=${kintone.app.record.getId()}`;
            const payload = {
                text: `案件< ${thisUrl} |「 ${e.record[fieldCode].value} 」>が完了しました！`,
            };
            return new kintone.Promise((resolve, reject) => {
                kintone.proxy(
                    webhookUrl,
                    'POST',
                    {},
                    payload,
                    (body, status, headers) => {
                        console.log(status, body);
                        resolve(e);
                    }
                );
            });
        }
        return e;
    });
})();
