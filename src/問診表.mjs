import { displayControl } from './displayControl/displayControl';
// import { set組織 } from './setField/set組織.mjs';

const EVENT = [
    'app.record.create.show',
    'app.record.edit.show',
    'app.record.create.change.past',
    'app.record.create.change.radio2',
    'app.record.create.change.radio3',
    'app.record.create.change.radio4',
    'app.record.create.change.radio5',
    'app.record.edit.show',
    'app.record.edit.change.past',
    'app.record.edit.change.radio2',
    'app.record.edit.change.radio3',
    'app.record.edit.change.radio4',
    'app.record.edit.change.radio5',
];
kintone.events.on(EVENT, (event) => {
    const record = event.record;
    displayControl(record);

    return event;
});

kintone.events.on(
    ['app.record.create.chenge.名前', 'app.record.edit.change.名前'],
    (event) => {
        const record = event.record;
        if (record.名前.value[0] === undefined) return;
        set組織(record);
        console.log(record.組織);
        return event;
    }
);

export const set組織 = async (record) => {
    const 組織情報 = await getUserOrganizations({
        code: record.名前.value[0].code,
    });
    record.組織.value[0] = {
        code: 組織情報.organization.code,
        name: 組織情報.organization.name,
    };
    kintone.app.record.set({ record });
};

/**
 * 所属組織の情報を取得するAPI
 *
 * @param {object} body リクエストボディ
 * @return {Promise<argument>} 引数：（取得成功時）所属組織の情報が入った配列、（エラー発生時）ERRORオブジェクト
 */
export const getUserOrganizations = (body) => {
    return kintone
        .api(kintone.api.url('/v1/user/organizations', true), 'GET', body)
        .then((resp) => {
            return resp.organizationTitles[0];
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};
