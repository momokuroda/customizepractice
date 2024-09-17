kintone.events.on('app.record.create.submit.success', (event) => {
    const stockAppId = kintone.app.getLookupTargetAppId('商品番号');
    const shippingRecord = event.record;
    const paramForGet = {
        アプリ: stockAppId,
        query: '商品番号 =' + shippingRecord['商品番号'].value,
    };
    kintone
        .api(kintone.api.url('/k/v1/records', true), 'GET', paramForGet)
        .then((resp) => {
            const stockRecord = resp.records[0];
            const afterQty =
                Number(stockRecord['在庫数'].value) -
                Number(shippingRecord['出庫数'].value);
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

// kintone.api(
//     kintone.api.url('/k/v1/record', true),
//     'PUT',
//     param,
//     function (resp) {
//         // 決済情報更新
//         var resp_payment = resp_body.billing[0]['payment'];
//         var resp_len = resp_payment.length;
//         var p_put_len = payment_put['payment']['length'];
//         var app_id =
//             body_api['keiri_billing_info_plugin-apifield_app_id']['value'];
//         var fn_payment_number =
//             body_api['keiri_billing_info_plugin-apifield_payment_number'][
//                 'value'
//             ];
//         // 決済情報番号設定
//         for (var j = 0; j < resp_len; j++) {
//             var resp_code = resp_payment[j]['code'];
//             var resp_number = resp_payment[j]['number'];
//             for (var jj = 0; jj < p_put_len; jj++) {
//                 if (
//                     payment_put['payment'][jj]['record'][fn_payment_code][
//                         'value'
//                     ] === resp_code
//                 ) {
//                     if (resp_number)
//                         payment_put['payment'][jj]['record'][
//                             fn_payment_number
//                         ]['value'] = resp_number;
//                 }
//             }
//         }
//         var pay_param = {
//             app: app_id,
//             records: payment_put['payment'],
//         };
//         kintone.api(
//             kintone.api.url('/k/v1/records', true),
//             'PUT',
//             pay_param,
//             function (puts_resp) {
//                 setAlert(1, winopen_flg);
//             },
//             function (puts_error) {
//                 console.log(puts_error);
//             }
//         );
//     },
//     function (error) {
//         console.log(error);
//     }
// );
