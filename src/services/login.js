import request from '../utils/request';
import testRequest from '../utils/testrequest';

export function login(argu) {

    let { username, password, isCompany } = argu;

    console.log(username, password, isCompany);

    return testRequest();

    // return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}