import "./Logo.css";

function Logo(){
    return (
        <div className="col" id="login-logo-col">
          <div className="image-container" id="login-image-container">
            <img src="../../../../logo.webp" id="login-logo-img" alt="Gesturobot logo" />
            <h2 id="login-logo-txt">GestuRobot</h2>
          </div>
      </div>
    );
}

export default Logo;