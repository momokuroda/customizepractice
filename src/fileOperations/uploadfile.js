import { putRecord } from '../setField/kintoneApi.mjs';

export const uploadfile = async () => {
    const blob = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const blob2 = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const blob3 = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const blob4 = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const blob5 = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const formData = new FormData();
    // ファイルをアップロードするAPIは、POSTメソッドのため、CSRFトークンを設定する
    formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
    formData.append('file', blob2, 'test2.txt');
    formData.append('file', blob3, 'test3.txt');
    formData.append('file', blob4, 'test4.txt');
    formData.append('file', blob5, 'test5.txt');
    for (let value of formData.entries()) {
        console.log(value);
    }
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    const resp = await fetch('/k/v1/file.json', {
        method: 'POST',
        headers,
        body: formData,
    });

    const respData = await resp.json();

    console.log(respData);

    // レコード更新
    await putRecord({
        app: kintone.app.getId(),
        id: kintone.app.record.getId(),
        record: {
            添付ファイル: { value: [{ fileKey: respData.fileKey }] },
        },
    });

    location.reload();
};
