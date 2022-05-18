import "./Login.css";

const Login = (props) => {
  const getScopeToken = async () => {
    try {
      console.log(props.auth.token);
      if (props.auth.type == "noScope") {
        window.location.replace(
          process.env.REACT_APP_BACKEND_URL + "auth/login"
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login-text">
      <p onClick={getScopeToken}>Login to save music to Spotify</p>
    </div>
  );
};

export default Login;
