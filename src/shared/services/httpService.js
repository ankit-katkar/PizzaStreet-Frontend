
class httpService {
    constructor() {
        this.token = ""
    }

    getToken() {
        return this.token = localStorage.getItem('authToken');
    }

    async uploadFileService(url, file) {
        const formData = new FormData()
        formData.append('file', file)
        let response = await fetch(url, {
            method: 'post',
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
            body: formData,
        })
        response = await response.json()
        return response
    }

    async postService(url, payload) {
        let response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${this.getToken()}`,
            },
            body: JSON.stringify(payload),
        })
        response = await response.json()
        return response
    }

    async getService(url) {
        let response = await fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${this.getToken()}`,
            }
        })
        response = await response.json()
        return response
    }

    async putService(url, payload) {
        let response = await fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${this.getToken()}`,
            },
            body: JSON.stringify(payload),
        })
        response = await response.json()
        return response
    }

    async deleteService(url) {
        let response = await fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${this.getToken()}`,
            }
        })
        response = await response.json()
        return response
    }

}
export default new httpService()