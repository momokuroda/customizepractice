import { uploadfile } from './uploadfile/uploadfile';

kintone.events.on('app.record.detail.show', (event) => {
    const record = event.record;
    const uploadFileButton = document.createElement('button');
    uploadFileButton.id = 'uploadfile_button';
    uploadFileButton.innerText = 'ファイルをアップロード';

    uploadFileButton.onclick = () => {
        uploadfile();
    };

    kintone.app.record
        .getHeaderMenuSpaceElement()
        ?.appendChild(uploadFileButton);
    return event;
});
