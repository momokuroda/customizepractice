export const set組織 = async (record) => {
    record.組織.value = await getUserOrganizations({
        code: record.名前.value[0].code,
    });
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
