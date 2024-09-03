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
            return resp.organizationTitles;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

//////////////////////////////////////////////////////////
export const setユーザー情報 = async (record) => {
    const userInfo = await getUserInfo({
        code: record.ユーザー選択.value[0].code,
    });
    record.ユーザー情報.value = JSON.stringify(userInfo, null, '\t');
    kintone.app.record.set({ record });
};

export const set利用サービス = async (record) => {
    const usingServide = await getUsingService({
        code: record.ユーザー選択.value[0].code,
    });
    record.利用サービス.value = JSON.stringify(usingServide, null, '\t');
    kintone.app.record.set({ record });
};

export const set組織情報 = async (record) => {
    const orgInfo = await getOrganizationInfo({
        code: record.組織選択.value[0].code,
    });
    record.組織情報.value = JSON.stringify(orgInfo, null, '\t');
    kintone.app.record.set({ record });
};

export const setグループ情報 = async (record) => {
    const groupInfo = await getGroupInfo({
        code: record.グループ選択.value[0].code,
    });
    record.グループ情報.value = JSON.stringify(groupInfo, null, '\t');
    kintone.app.record.set({ record });
};

///////////////////////////////////////////

export const getUserInfo = (body) => {
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

export const getUsingService = (body) => {
    return kintone
        .api(kintone.api.url('/v1/users/services', true), 'GET', body)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            return kintone.Promise.reject(new Error(error));
        });
};

export const getOrganizationInfo = (body) => {
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

export const getGroupInfo = (body) => {
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
