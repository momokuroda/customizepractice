const 日付EVENT = [
    'app.record.create.change.日付登録',
    'app.record.edit.change.日付登録',
];

const 日時EVENT = [
    'app.record.create.change.日時登録',
    'app.record.edit.change.日時登録',
];

const ユーザーEVENT = [
    'app.record.create.change.ユーザー選択',
    'app.record.edit.change.ユーザー選択',
];

const 組織EVENT = [
    'app.record.create.change.組織選択',
    'app.record.edit.change.組織選択',
    ,
];

const グループEVENT = [
    'app.record.create.change.グループ選択',
    'app.record.edit.change.グループ選択',
];

kintone.events.on(
    [
        'app.record.create.change.チェックボックス',
        'app.record.edit.change.チェックボックス',
    ],
    (event) => {
        const record = event.record;
        if (record.チェックボックス.value.includes('エラー出力')) {
            event.error = 'チェックされました';
        }
        return event;
    }
);

kintone.events.on('app.record.detail.show', (event) => {
    const record = event.record;

    // ファイル添付処理
    const headerSpace = kintone.app.record.getHeaderMenuSpaceElement();
    const button = document.createElement('button');
    button.textContent = 'ファイルを別アプリへ添付';
    headerSpace.appendChild(button);
    button.addEventListener('click', () => {
        const tar_app_id = 58;
        const auth_token = 'bW9rdXJvZGE6bWlja3kyMTMgDQoNCg==';
        const filename = event.record['添付ファイル'].value[0].name;
        const downloadFileKey = event.record['添付ファイル'].value[0].fileKey;
        const downloadFileUrl =
            kintone.api.url('/k/v1/file', true) + '?fileKey=' + downloadFileKey;
        const uploadFileUrl = kintone.api.url('/k/v1/file', true);
        var boundary =
            '---------------------------20111107kintone20111107cybozucom'; // multipart/form-dataリクエスト用のboundayr

        // 現レコードの既存添付ファイル（先頭1つ）をダウンロード
        return kintone
            .proxy(
                downloadFileUrl,
                'GET',
                {
                    'X-Cybozu-Authorization': auth_token,
                },
                {}
            )
            .then(function (get_args) {
                console.log(get_args);
                // ダウンロードした添付ファイルをkintoneにアップロード
                var param =
                    '--' +
                    boundary +
                    '\r\n' +
                    'Content-Disposition: form-data; name="file"; filename="' +
                    filename +
                    '"\r\nContent-Type: application/octet-stream\r\n\r\n' +
                    get_args[0] +
                    '\r\n' +
                    '--' +
                    boundary +
                    '--'; // 挟み込むリクエストbody部分

                // ファイルアップロードをリクエスト
                return kintone.proxy(
                    uploadFileUrl,
                    'POST',
                    {
                        'X-Cybozu-Authorization': auth_token,
                        'Content-Type':
                            'multipart/form-data; boundary=' + boundary,
                    },
                    param
                );
            })
            .then(function (post_args) {
                console.log(post_args);
                // アップロードしたファイルを紐つけてレコード登録
                var fileValue = JSON.parse(post_args[0]);
                return kintone.api(
                    kintone.api.url('/k/v1/record', true),
                    'POST',
                    {
                        app: tar_app_id,
                        record: {
                            タイトル: {
                                value: 'コピーされた' + filename,
                            },
                            添付ファイル: {
                                value: [fileValue],
                            },
                        },
                    }
                );
            })
            .then(function (resp) {
                console.log(resp);
                alert('添付ファイルをコピーしました。');
            })
            .catch(function (err) {
                console.log(err);
                alert('添付ファイルのコピーに失敗しました。');
            });
    });

    return event;
});

kintone.events.on(
    ['app.record.create.show', 'app.record.edit.show'],
    async (event) => {
        const record = event.record;
        const limit = await kintone.api.getConcurrencyLimit();
        record.RESTAPI同時接続数.value = JSON.stringify(limit, null, '\t');
        // getLoginUser
        const loginuserinfo = kintone.getLoginUser();
        record.getLoginUser.value = JSON.stringify(loginuserinfo, null, '\t');
        return event;
    }
);

kintone.events.on(日時EVENT, (event) => {
    const record = event.record;
    if (record.日時登録.value === undefined) return;
    record.日時.value = record.日時登録.value;
    return event;
});

kintone.events.on(ユーザーEVENT, (event) => {
    const record = event.record;
    if (record.ユーザー選択.value.length === 0) {
        record.ユーザー情報.value = '';
        record.利用サービス.value = '';
        return event;
    }
    setユーザー情報(record);
    set利用サービス(record);
    return event;
});

kintone.events.on(組織EVENT, (event) => {
    const record = event.record;
    if (record.組織選択.value.length === 0) return;
    set組織情報(record);
    return event;
});

kintone.events.on(グループEVENT, (event) => {
    const record = event.record;
    if (record.グループ選択.value.length === 0) return;
    setグループ情報(record);
    return event;
});

/////////////////////////////////////////////

const setユーザー情報 = async (record) => {
    const userInfo = await getUserInfo({
        code: record.ユーザー選択.value[0].code,
    });
    record.ユーザー情報.value = JSON.stringify(userInfo, null, '\t');
    kintone.app.record.set({ record });
};
const getUserInfo = (body) => {
    return kintone
        .api(kintone.api.url('/v1/users', true), 'GET', body)
        .then((resp) => {
            console.log(resp);
            return resp;
        })
        .catch((error) => {
            return new Error(error.message);
        });
};

const set利用サービス = async (record) => {
    const usingServide = await getUsingService({
        code: record.ユーザー選択.value[0].code,
    });
    record.利用サービス.value = JSON.stringify(usingServide, null, '\t');
    kintone.app.record.set({ record });
};

const getUsingService = (body) => {
    return kintone
        .api(kintone.api.url('/v1/users/services', true), 'GET', body)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            return kintone.Promise.reject(new Error(error));
        });
};

const set組織情報 = async (record) => {
    const orgInfo = await getOrganizationInfo({
        code: record.組織選択.value[0].code,
    });
    record.組織情報.value = JSON.stringify(orgInfo, null, '\t');
    kintone.app.record.set({ record });
};

const getOrganizationInfo = (body) => {
    return kintone
        .api(kintone.api.url('/v1/organizations', true), 'GET', body)
        .then((resp) => {
            console.log(resp);
            return resp;
        })
        .catch((error) => {
            return new Error(error.message);
        });
};

const setグループ情報 = async (record) => {
    const groupInfo = await getGroupInfo({
        code: record.グループ選択.value[0].code,
    });
    record.グループ情報.value = JSON.stringify(groupInfo, null, '\t');
    kintone.app.record.set({ record });
};

const getGroupInfo = (body) => {
    return kintone
        .api(kintone.api.url('/v1/groups', true), 'GET', body)
        .then((resp) => {
            console.log(resp);
            return resp;
        })
        .catch((error) => {
            {
                return new Error(error.message);
            }
        });
};
