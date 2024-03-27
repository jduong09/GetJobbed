

const LandingPage = () => {

  const handleSignUp = (e) => {
    e.preventDefault();

    const authorizeUser = async () => {
      try {
        const response = await fetch('/api/auth/authorize');
        const { signedIn, oauthUrl } = await response.json();
        if (!signedIn) {
          window.location = oauthUrl;
        }
      } catch(err) {
        console.log(err);
      }
    }
    authorizeUser();
  }

  return (
    <div>
      <header>
        <h1>GetJobbed</h1>
        <nav>
          <button type="button" id="btn-sign-up" onClick={handleSignUp}>Sign Up</button>
          <a type="button" href={`http://localhost:5173/login`}>Sign In</a>
        </nav>
      </header>
      <div>
        Yo I am main div of Landing Page.
      </div>
    </div>
  );
}

export default LandingPage;