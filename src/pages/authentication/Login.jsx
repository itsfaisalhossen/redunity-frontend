 import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useAuth from "../../hooks/useAuth";
import Container from "../../ui/Container";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  const { setUser, signInWithEmailAndPasswordFunc } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const roleCredencitals = {
    Admin: { email: "itsfaisalhossen@gmail.com", pass: "123456$Zx" },
    Donor: { email: "faisalhossen396@gmail.com", pass: "123456$Zx" },
    Volunteer: { email: "mb@salman.com", pass: "123456$Zx" },
  };

  const handleRoleFill = (role) => {
    setEmail(roleCredencitals[role].email);
    setPassword(roleCredencitals[role].pass);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInWithEmailAndPasswordFunc(email, password);
      setUser(result.user);
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        width: 300,
        background: "#020617",
        color: "#FFFFFF",
        showConfirmButton: false,
        timer: 1500,
      });
  
      navigate(from);
    } catch (error) {
      console.log(error);
      toast.error("Email or Password is wrong");
    } finally {
      setLoading(false);
    }
  };

  const roles = ["Admin", "Donor", "Volunteer"];

  return (
    <>
      <Helmet>
        <title>RedUnity | Login</title>
      </Helmet>
      
      <Container>
      <div className="ru-root">
        <div className="ru-bg">
          <div className="ru-orb ru-orb-1" />
          <div className="ru-orb ru-orb-2" />
          <div className="ru-orb ru-orb-3" />
        </div>
        {/* ── Left panel (desktop only) ── */}
        <div className="ru-left">
          <div>
            <h1 className="ru-brand">
              Red<span>Unity</span>
            </h1>
            <p className="ru-tagline">
              Connecting blood donors with those in need.<br />
              Every drop counts. Every donor matters.
            </p>
            <div className="ru-stat-row">
              <div className="ru-stat">
                <span className="ru-stat-num">12K+</span>
                <span className="ru-stat-label">Donors</span>
              </div>
              <div className="ru-stat">
                <span className="ru-stat-num">8.4K</span>
                <span className="ru-stat-label">Lives Saved</span>
              </div>
              <div className="ru-stat">
                <span className="ru-stat-num">340</span>
                <span className="ru-stat-label">Campaigns</span>
              </div>
            </div>
          </div>

          {/* Decorative large drop */}
          <div className="ru-drop-art">
            <svg width="320" height="420" viewBox="0 0 320 420" fill="none">
              <path d="M160 10C160 10 20 170 20 260C20 344 84 410 160 410C236 410 300 344 300 260C300 170 160 10 160 10Z"
                fill="white" />
            </svg>
          </div>
        </div>
        {/* ── Right panel ── */}
        <div className="ru-right">
          <div className={`ru-card ${mounted ? "ru-visible" : ""}`}>

            {/* Home link */}
            <Link to="/" className="ru-home-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back to home
            </Link>

            <div className="ru-card-inner">
              {/* Eyebrow */}
              <div className="ru-eyebrow">
                <div className="ru-drop-icon">
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                    <path d="M7 1C7 1 1 8 1 12.5C1 15.5 3.7 18 7 18C10.3 18 13 15.5 13 12.5C13 8 7 1 7 1Z" fill="white"/>
                  </svg>
                </div>
                <span className="ru-eyebrow-text">RedUnity</span>
              </div>

              <h2 className="ru-heading">Sign in</h2>
              <p className="ru-subheading">Welcome back — good to see you again.</p>

              <form onSubmit={handleSignin}>
                {/* Email */}
                <div className="ru-field">
                  <label className="ru-label">Email</label>
                  <div className="ru-input-wrap">
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="ru-input"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="ru-field">
                  <label className="ru-label">Password</label>
                  <div className="ru-input-wrap">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="ru-input ru-input-pw"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ru-pw-toggle"
                    >
                      {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="ru-submit">
                  {loading ? (
                    <><span className="ru-spin" />Signing in...</>
                  ) : "Sign In"}
                </button>
              </form>

              {/* Demo roles */}
              <div className="ru-divider">
                <div className="ru-divider-line" />
                <span className="ru-divider-text">demo accounts</span>
                <div className="ru-divider-line" />
              </div>

              <div className="ru-chips">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleFill(role)}
                    className="ru-chip"
                  >
                    {role}
                  </button>
                ))}
              </div>

              <p className="ru-register">
                No account?{" "}
                <Link to="/auth/register">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default Login;