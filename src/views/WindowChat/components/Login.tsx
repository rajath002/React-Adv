import { FormEvent, useState } from "react";

interface ILogin {
  onLogin: (username: string, windowName: string) => string;
  windowName: string;
}

export default function Login(props: ILogin) {
  const [error, setError] = useState("");

  const login = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
    };
    const result = props.onLogin(target.username.value, props.windowName);
    console.log(result);

    if (result) {
      setError(result);
    } else {
      setError("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={login} style={{ display: "flex" }}>
        <input type="text" name="username" id="username" />
        <button type="submit" style={{ textAlign: "center" }}>
          Login
        </button>
      </form>
      <div style={{ textAlign: "center" }}>{error}</div>
    </div>
  );
}
