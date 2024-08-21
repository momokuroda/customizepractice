/**
 * アプリのレコードを複数件取得するAPI
 * 一回のGETリクエストで最大500件取得可能。
 *
 * @param {object} body リクエストボディ
 * @return {Promise<argument>} totalCountを指定した場合の引数：（取得成功時）レコードのObjectが入った配列
 *                   totalCountを指定しなかった場合の引数：（取得成功時）レコードが入った配列と取得件数をプロパティとしたobject
 *                   いずれの場合もエラー発生時の引数：ERRORオブジェクト
 */
export const getRecords = (body) => {
    return kintone
        .api(kintone.api.url('/k/v1/records', true), 'GET', body)
        .then((resp) => {
            // prettier-ignore
            return body.totalCount
                ? resp
                : resp.records;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

/**
 * アプリのレコードを全件取得するAPI
 *
 * @param {object} body リクエストボディ
 * @param {number} recordId 再起呼び出し時に使用する、APIレスポンスで取得した次に指定するレコードID。(getAllRecordsを使用する際は指定不要)
 * @param {array}  records 再起呼び出し時に使用する、APIレスポンスで取得したレコードが入った配列。(getAllRecordsを使用する際は指定不要)
 * @return {Promise<argument>} 引数：（取得成功時）レコードが入った配列、（エラー発生時）ERRORオブジェクト
 */
export const getAllRecords = (body, recordId = -1, records = []) => {
    let respRecords = records;

    // body.fieldsに$idが入っていない、かつ空配列でない場合に、再起呼び出しで使用する$idを追加する。
    if (recordId === -1 && body.fields) {
        if (!body.fields.includes('$id') && body.fields.length !== 0) {
            body.fields.push('$id');
        }
    }

    // 次に取得する500件を設定。再起呼び出しされた場合は、recordIdにはid番号が入り-1ではなくなる。
    const bodyAddedQuery = Object.assign({}, body); // bodyは再起呼び出しで再利用するためbodyを複製
    if (recordId === -1) {
        bodyAddedQuery.query = bodyAddedQuery.query
            ? `${bodyAddedQuery.query} order by $id asc limit 500`
            : 'order by $id asc limit 500';
    } else {
        bodyAddedQuery.query = bodyAddedQuery.query
            ? `(${bodyAddedQuery.query}) and $id > ${recordId} order by $id asc limit 500`
            : `$id > ${recordId} order by $id asc limit 500`;
    }

    // APIを実行
    return kintone
        .api(kintone.api.url('/k/v1/records', true), 'GET', bodyAddedQuery)
        .then((resp) => {
            respRecords = respRecords.concat(resp.records);
            if (resp.records.length === 500) {
                return getAllRecords(
                    body,
                    resp.records[499].$id.value,
                    respRecords
                );
            }
            return respRecords;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

export const getUsersInfo = (body) => {
    return kintone
        .api(kintone.api.url('/v1/users', true), 'GET', body)
        .then((resp) => {
            return resp.users;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

export const getOrganizationUsersInfo = (body) => {
    return kintone
        .api(kintone.api.url('/v1/organization/users', true), 'GET', body)
        .then((resp) => {
            return resp.userTitles;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

export const getOrganizations = (body) => {
    return kintone
        .api(kintone.api.url('/v1/organizations', true), 'GET', body)
        .then((resp) => {
            return resp.organizations;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

/**
 * ステータスを更新するAPI
 */

export const updateStatus = (body) => {
    return kintone
        .api(kintone.api.url('/k/v1/record/status', true), 'PUT', body)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

export const updateAssigneesByToken = (body, token = '') => {
    // リクエストの設定
    body.__REQUEST_TOKEN__ = kintone.getRequestToken();
    const url = kintone.api.url('/k/v1/record/assignees', true);
    const xhr = new XMLHttpRequest();
    // XMLHttpRequest実行
    xhr.open('PUT', url, false);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    if (token) {
        xhr.setRequestHeader('X-Cybozu-API-Token', token);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    const resp = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
        return kintone.Promise.resolve(resp);
    }
    // XMLHttpRequestがエラーの場合
    console.log(resp);
    return kintone.Promise.reject(resp);
};

/**
 * アプリのレコードを一件更新するAPI
 *
 * @param {object} body リクエストボディ
 * @return {Promise<argument>} 引数：（更新成功時）PUTしたレコードの情報を持つobject、（エラー発生時）ERRORオブジェクト
 */
export const putRecord = (body) => {
    return kintone
        .api(kintone.api.url('/k/v1/record', true), 'PUT', body)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

/**
 * アプリへレコードを複数件登録するAPI
 * 一回のPOSTリクエストで最大100件登録可能。
 *
 * @param {object} body リクエストボディ
 * @return {Promise<argument>} 引数：（登録成功時）POSTしたレコードの情報を持つobject、（エラー発生時）ERRORオブジェクト
 */
export const postRecords = (body) => {
    return kintone
        .api(kintone.api.url('/k/v1/records', true), 'POST', body)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};

/**
 * アプリへレコードを全件登録するAPI
 *
 * @param {object} body リクエストボディ
 * @param {number} Ids 再起呼び出し時に使用する、APIレスポンスで取得した登録済みのレコードidが入った配列。(postAllRecordsを使用する際は指定不要)
 * @return {Promise<argument>} 引数：（登録成功時）POSTしたレコードidが入った配列、（エラー発生時）ERRORオブジェクト
 */
export const postAllRecords = (body, ids = []) => {
    // 次に登録する100件を設定
    let respIds = ids;
    const toPostRecords = body.records.slice(0, 100);
    const nextRecords = body.records.slice(100);
    const bodyLimitedRecords = Object.assign({}, body);
    bodyLimitedRecords.records = toPostRecords;

    // APIを実行
    return kintone
        .api(kintone.api.url('/k/v1/records', true), 'POST', bodyLimitedRecords)
        .then((resp) => {
            respIds = respIds.concat(resp.ids);
            if (nextRecords.length) {
                bodyLimitedRecords.records = nextRecords;
                return postAllRecords(bodyLimitedRecords, respIds);
            }
            return respIds;
        })
        .catch((error) => {
            console.log(error);
            return kintone.Promise.reject(error);
        });
};
