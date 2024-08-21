export const downloadfile = async () => {
    const { record } = kintone.app.record.get();
    const { fileKey } = record['添付ファイル'].value[0];
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    const resp = await fetch(`/k/v1/file.json?fileKey=${fileKey}`, {
        method: 'GET',
        headers,
    });
    const blob = await resp.blob();
    const url = window.URL || window.webkitURL;
    const blobUrl = url.createObjectURL(blob);
    console.log(blobUrl);
};
