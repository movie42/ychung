export const HTTP_METHOD = {
  GET() {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      }
    };
  },
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      },
      body: data ? JSON.stringify({ ...data }) : null
    };
  },
  PUT(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      },
      body: data ? JSON.stringify({ ...data }) : null
    };
  },
  PATCH(data) {
    return {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      },
      body: data ? JSON.stringify({ ...data }) : null
    };
  },
  DELETE() {
    return {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      }
    };
  }
};

export const request = async (url, method) => {
  const response = await fetch(url, method);
  if (!response.ok) {
    console.log("에러가 발생했습니다.");
    return;
  }
  return response.json();
};

export const requestWithoutJson = async (url, method) => {
  const response = await fetch(url, method);
  if (!response.ok) {
    console.error("에러가 발생했습니다.");
    return;
  }
  return response;
};
