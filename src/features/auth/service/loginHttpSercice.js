const BASE_URL = import.meta.env.VITE_BASE_URL;

class loginHttpService {
  constructor() {
    this.userContactNumber = "";
  }

  setContactNumber(number) {
    this.userContactNumber = number;
  }

  getContactNumber() {
    return this.userContactNumber;
  }

  httpPostService = async (endpoint, payload) => {
    const url = BASE_URL + endpoint;
    let response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    response = await response.json();
    return response;
  }

}

loginHttpService = new loginHttpService()
export default loginHttpService;
