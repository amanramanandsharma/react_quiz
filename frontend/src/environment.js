const dev = {
  url: "http://127.0.0.1:8200/api",
  LS: "GeekZiuqUser",
  clientId: '745534850555-m40vla96mqohf4nakl9gebuklm6odels.apps.googleusercontent.com'
};

const prod = {
  url: "https://backend.geekziuq.com/api",
  LS: "GeekZiuqUser",
  clientId: '745534850555-m40vla96mqohf4nakl9gebuklm6odels.apps.googleusercontent.com'
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;