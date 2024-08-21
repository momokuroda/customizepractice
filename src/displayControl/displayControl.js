export const displayControl = (record) => {
    kintone.app.record.setFieldShown('other', false);
    kintone.app.record.setFieldShown('vaccination', false);
    kintone.app.record.setFieldShown('disease', false);
    kintone.app.record.setFieldShown('date3', false);
    kintone.app.record.setFieldShown('cause', false);
    kintone.app.record.setFieldShown('symptom', false);
    kintone.app.record.setFieldShown('detail', false);

    const past = record.past.value;
    if (past.includes('その他')) {
        kintone.app.record.setFieldShown('other', true);
    }
    if (record.radio2.value === 'ある') {
        kintone.app.record.setFieldShown('vaccination', true);
    }
    if (record.radio3.value === 'はい') {
        kintone.app.record.setFieldShown('disease', true);
        kintone.app.record.setFieldShown('date3', true);
    }
    if (record.radio4.value === 'ある') {
        kintone.app.record.setFieldShown('cause', true);
        kintone.app.record.setFieldShown('symptom', true);
    }
    if (record.radio5.value === 'ある') {
        kintone.app.record.setFieldShown('detail', true);
    }
};
