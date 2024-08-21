import { putRecord } from '../kintoneApi/kintoneApi';

export const uploadfile = async () => {
    const blob = new Blob(['テストファイルです'], {
        type: 'text/plain',
    });
    const formData = new FormData();
    // ファイルをアップロードするAPIは、POSTメソッドのため、CSRFトークンを設定する
    formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
    formData.append('file', blob, 'test.txt');

    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    const resp = await fetch('/k/v1/file.json', {
        method: 'POST',
        headers,
        body: formData,
    });
    const respData = await resp.json();

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
