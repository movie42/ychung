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
      method: "PUT",
      hedaers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      },
      body: JSON.stringify({ ...data })
    };
  },
  PATCH(data) {
    return {
      method: "PATCH",
      hedaers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
          "content"
        ]
      },
      body: JSON.stringify({ ...data })
    };
  },
  DELETE() {
    return {
      method: "DELETE",
      "X-CSRF-Token": document.querySelector("meta[name='csrf-token']")[
        "content"
      ]
    };
  }
};

export const request = async (url, method) => {
  const response = await fetch(url, method);
  if (!response.ok) {
    console.error();
    throw new Error();
  }
  return response.json();
};

export const requestWithoutJson = async (url, method) => {
  const response = await fetch(url, method);
  console.log(response);
  if (!response.ok) {
    console.error(e);
    throw new Error();
  }

  return response;
};
