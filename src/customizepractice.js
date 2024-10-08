import { uploadfile } from './fileOperations/uploadfile';
import { downloadfile } from './fileOperations/downloadfile';

kintone.events.on('app.record.detail.show', (event) => {
    const record = event.record;

    const uploadFileButton = document.createElement('button');
    uploadFileButton.id = 'uploadfile_button';
    uploadFileButton.innerText = 'ファイルをアップロード';

    uploadFileButton.onclick = () => {
        uploadfile();
    };

    const downloadFileButton = document.createElement('button');
    downloadFileButton.id = 'downloadfile_buton';
    downloadFileButton.innerText = 'ファイルをダウンロード';

    downloadFileButton.onclick = () => {
        downloadfile();
    };

    kintone.app.record
        .getHeaderMenuSpaceElement()
        ?.appendChild(uploadFileButton);
    kintone.app.record
        .getHeaderMenuSpaceElement()
        ?.appendChild(downloadFileButton);

    // レコードIDを取得する
    kintone.app.record.getId();

    // レコードに値をセットする
    kintone.app.record.set(record);
    // フィールド要素を取得する

    return event;
});
