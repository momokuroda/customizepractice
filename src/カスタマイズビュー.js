(function () {
    'use strict';
    kintone.events.on(['mobile.app.record.index.show'], (e) => {
        // 先程メモしたカスタマイズビューのViewIdでない場合は処理を終了します。
        if (e.viewId !== 8375466) {
            return e;
        }

        // カスタマイズビューに設置したDiv要素を取得
        const targetElement = document.querySelector('#view');

        // アプリのレコードを取得
        // (モバイルの場合はREST APIでデータを取得する必要がある)
        kintone.api(
            kintone.api.url('/k/v1/records', true),
            'GET',
            { app: e.appId },
            (resp) => {
                de;

                // レコードの数だけ繰り返し、DOMを作成
                resp.records.forEach((record) => {
                    // レコード情報用のWrapper
                    const wrapper = $('<div />', {
                        // 余白を指定
                        css: {
                            padding: '16px 8px',
                            borderBottom: 'solid 1px gray',
                        },
                    });

                    // 会社名
                    $('<a />', {
                        text: record.会社名.value,
                        href:
                            '/k/m/' +
                            e.appId +
                            '/show?record=' +
                            record.$id.value, // レコードのリンク
                        css: {
                            fontWeight: 'bold',
                        },
                    }).appendTo(wrapper); // レコード情報用のWrapperに追加

                    // 詳細情報のWrapper
                    const details = $('<div />', {
                        css: {
                            padding: '8px 8px',
                        },
                    }).appendTo(wrapper); // レコード情報用のWrapperに追加

                    // 住所
                    $('<div />', {
                        text:
                            '〒' +
                            record.郵便番号.value +
                            ' ' +
                            record.住所.value,
                    }).appendTo(details); // 詳細情報用のWrapperに追加

                    // 担当者
                    $('<div />', {
                        text: '担当者名: ' + record.担当者名.value,
                    }).appendTo(details);

                    // 電話番号
                    $('<a />', {
                        html: record.TEL.value + '<br />', // 見栄えのために改行を指定
                        href: 'tel:' + record.TEL.value, // tel: をつけることでタップすると電話アプリが起動する
                    }).appendTo(details);

                    // メールアドレス
                    $('<a />', {
                        text: record.メールアドレス.value,
                        href: 'mailto:' + record.メールアドレス.value, // mailto: をつけることでタップするとメールアプリが起動する
                    }).appendTo(details);

                    $(targetElement).append(wrapper);
                });
            }
        );
        return e;
    });
})();
