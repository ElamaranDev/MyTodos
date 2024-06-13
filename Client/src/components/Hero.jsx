import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="hero-container">
      <div className="card">
        <h1 id="hero-header">
          Authenticated ToDo App for Your Secure Task Management
        </h1>
        <p id="hero-text">
          Ready to conquer your day? Dive into our Todo Application and
          transform your tasks into achievements. Stay organized, focused, and
          productive with our intuitive interface. Whether it is work, study, or
          personal goals, manage it all seamlessly with our Todo App. Start
          making progress today!
        </p>

        <div className="action-area">
          {userInfo ? (
            <NavLink className={"hero-btn-a"} to={"/todos"}>
              <button className="hero-button-view-todo">View Todos</button>
            </NavLink>
          ) : (
            <>
              <NavLink className={"hero-btn-a"} to={"/login"}>
                <button className="hero-button-sign-in">Sign In</button>
              </NavLink>
              <NavLink className={"hero-btn-a"} to={"/register"}>
                <button className="hero-button-sign-up">Sign Up</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
