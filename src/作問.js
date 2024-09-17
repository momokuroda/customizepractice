// A
kintone.events.on('app.record.create.submit.success', (event) => {
    const stockAppId = kintone.app.getLookupTargetAppId('商品番号');
    const shippingRecord = event.record;
    // afterQty を実行します。
    const paramForGet = {
        app: stockAppId,
        query: '商品番号' = + shippingRecord ['商品番号'].value 
    };

    kintone
        .api(kintone.api.url('/k/v1/records', true), 'GET', paramForGet)
        .then((resp) => {
            const stockRecord = resp.records[0];
            const afterQty =
                Number(stockRecord['在庫数'].value) -
                Number(shippingRecord['出庫数'].value);
        });

    const paramForPut = {
        app: stockAppId,
        updateKey: {
            field: '商品番号',
            value: shippingRecord['商品番号'].value,
        },
        record: {
            在庫数: {
                value: afterQty,
            },
        },
    };
    // true),'PUT',paramForPut).then((resp2) = { kintone.api(kintone.api.url('/k/v1/records'
    window.alert('在庫管理アプリの在庫数を更新しました');
    // });
});

// B
kintone.events.on('app.record.create.submit.success', (event) => {
    const stockAppId = kintone.app.getLookupTargetAppId('商品番号');
    const shippingRecord = event.record;
    const paramForGet = {
        app: stockAppId,
        query: '商品番号 '= + shippingRecord['商品番号'].value
    };

    return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', paramForGet).then((resp) => { 
    const stockRecord = resp.records[0];
    const afterQty = Number(stockRecord ['在庫数'].value) - Number(shippingRecord ['出庫数'].value);
    const paramForPut = {
        app: stockAppId,
        id: stockRecord.$id.value,
        record: {
            在庫数: {
                value: afterQty,
            },
        },
    };
    return (kintone.api.url('/k/v1/record', true), 'PUT', paramForPut);
    }).then((resp) => {
    window.alert('在庫管理アプリの在庫数を更新しました');
    });
});

// C
kintone.events.on('app.record.create.submit.success', (event) => {
    const stockAppId = kintone.app.getLookupTargetAppId('商品番号');
    const shippingRecord = event.record;
    const paramForGet = {
        app: stockAppId,
        query: '商品番号' = + shippingRecord ['商品番号'].value
    };

    kintone.api(kintone.api.url('/k/v1/records', true), 'GET', paramForGet, (resp) => {
    const stockRecord = resp.records[0];
    const afterQty = Number(stockRecord['在庫数'].value) -Number(shippingRecord['出庫数'].value);
    const paramForPut = {
        app: stockAppId,
        id: stockRecord.$id.value,
        record: {
            在庫数: {
                value: afterQty,
            },
        },
    };
    kintone.api(
        kintone.api.url('/k/v1/record', true),
        'PUT',
        paramForPut,
        (resp) => {
            window.alert('在庫管理アプリの在庫数を更新しました');
        }
    );
    });
});
