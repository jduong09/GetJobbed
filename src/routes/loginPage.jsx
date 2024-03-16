import { useEffect } from 'react';

const gmailClientId = "966816151735-86upo3jqeu0ds1f1aka697ddpl6c1m9a.apps.googleusercontent.com";

const Login = () => {
  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: gmailClientId,
        login_uri: "http://localhost:5000/api/auth/login",
        ux_mode: "redirect"
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "filled_black",
        text: "signin_with",
        shape: "pill",
      });

      // google.accounts.id.prompt();
    }
  }, []);
  return (
    <div>
      <h2>Login Page</h2>
      <div id="loginDiv"></div>
    </div>
  );
}

export default Login;