/* eslint-disable react-hooks/set-state-in-effect */
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../../ui/Container";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [district, setDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    setUser,
    loading,
    setLoading,
    updateProfileFunc,
    createUserWithEmailAndPasswordFunc,
  } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch("/dristict.json")
      .then((res) => res.json())
      .then((data) => setDistrictData(data));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilaData(data));
  }, []);

  useEffect(() => {
    if (district) {
      const result = upazilaData.filter((u) => u.district_id === district);
      setFilteredUpazilas(result);
    } else {
      setFilteredUpazilas([]);
    }
  }, [district, upazilaData]);

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const displayName = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;
    const upazilaName = form.upazila.value;
    const avatarFile = form.avatar.files[0];

    const selectedDistrict = districtData.find((d) => d.id === district);
    const districtName = selectedDistrict ? selectedDistrict.name : "";

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      setLoading(false);
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        const user = res.user;
        const formData = new FormData();
        formData.append("image", avatarFile);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        fetch(image_API_URL, { method: "POST", body: formData })
          .then((res) => res.json())
          .then((imgData) => {
            const photoURL = imgData?.data?.display_url || "";
            const newUser = {
              name: displayName,
              email,
              image: photoURL,
              bloodGroup,
              district: districtName,
              upazila: upazilaName,
              status: "Active",
            };
            console.log("New User:", newUser);
            axiosSecure
              .post("/users", newUser)
              .then((res) => {
                if (res.data.insertedId) console.log("User created in the database");
              })
              .catch((err) => console.error(err));

            updateProfileFunc(displayName, photoURL).then(() => {
              setUser({ ...user, displayName, photoURL });
              toast.success("Account created successfully 🎉");
              navigate(location.state ? location.state : "/");
              form.reset();
              setLoading(false);
            });
          })
          .catch((err) => {
            toast.error("Image upload failed");
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>RedUnity | Register</title>
      </Helmet>
      <Container>
      <div className="rr-root">
        <div className="rr-bg">
          <div className="rr-orb rr-orb-1" />
          <div className="rr-orb rr-orb-2" />
          <div className="rr-orb rr-orb-3" />
        </div>

        <div className={`rr-card ${mounted ? "rr-visible" : ""}`}>

          {/* Home link */}
          <Link to="/" className="rr-home-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to home
          </Link>

          <div className="rr-card-inner">
            {/* Eyebrow */}
            <div className="rr-eyebrow">
              <div className="rr-drop-icon">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path d="M7 1C7 1 1 8 1 12.5C1 15.5 3.7 18 7 18C10.3 18 13 15.5 13 12.5C13 8 7 1 7 1Z" fill="white"/>
                </svg>
              </div>
              <span className="rr-eyebrow-text">RedUnity</span>
            </div>

            <h2 className="rr-heading">Create account</h2>
            <p className="rr-subheading">Join the community. Every donor saves a life.</p>

            <form onSubmit={handleRegister}>
              <div className="rr-grid">

                {/* ── Personal info ── */}
                <div className="rr-section-label">Personal info</div>

                <div className="rr-field">
                  <label className="rr-label">Full Name</label>
                  <input type="text" name="name" placeholder="Your full name" required className="rr-input" />
                </div>

                <div className="rr-field">
                  <label className="rr-label">Email</label>
                  <input type="email" name="email" placeholder="you@example.com" required className="rr-input" />
                </div>

                {/* Avatar */}
                <div className="rr-field">
                  <label className="rr-label">Avatar</label>
                  <label className="rr-file-label" htmlFor="avatar-input">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,45,85,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span id="avatar-name">Choose a photo...</span>
                  </label>
                  <input
                    id="avatar-input"
                    type="file"
                    name="avatar"
                    required
                    accept="image/*"
                    className="rr-file-input"
                    onChange={(e) => {
                      const el = document.getElementById("avatar-name");
                      if (el) el.textContent = e.target.files[0]?.name || "Choose a photo...";
                    }}
                  />
                </div>

                {/* Blood Group */}
                <div className="rr-field">
                  <label className="rr-label">Blood Group</label>
                  <div className="rr-blood-wrap">
                    <select name="bloodGroup" required className="rr-select">
                      <option value="">Select blood group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                </div>

                {/* ── Location ── */}
                <div className="rr-section-label">Location</div>

                <div className="rr-field">
                  <label className="rr-label">District</label>
                  <div className="rr-blood-wrap">
                    <select value={district} onChange={(e) => setDistrict(e.target.value)} required className="rr-select">
                      <option value="">Select district</option>
                      {districtData.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rr-field">
                  <label className="rr-label">Upazila</label>
                  <div className="rr-blood-wrap">
                    <select name="upazila" required disabled={!district} className="rr-select">
                      <option value="">Select upazila</option>
                      {filteredUpazilas.map((u) => (
                        <option key={u.id} value={u.name}>{u.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ── Security ── */}
                <div className="rr-section-label">Security</div>

                <div className="rr-field">
                  <label className="rr-label">Password</label>
                  <div className="rr-pw-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="••••••••"
                      className="rr-input rr-input-pw"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="rr-pw-toggle">
                      {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                    </button>
                  </div>
                </div>

                <div className="rr-field">
                  <label className="rr-label">Confirm Password</label>
                  <div className="rr-pw-wrap">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      placeholder="••••••••"
                      className="rr-input rr-input-pw"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="rr-pw-toggle">
                      {showConfirmPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <div className="rr-full" style={{ marginTop: "8px" }}>
                  <button type="submit" disabled={loading} className="rr-submit">
                    {loading ? (
                      <><span className="rr-spin" />Creating account...</>
                    ) : "Create Account"}
                  </button>
                </div>
              </div>
            </form>

            <p className="rr-login">
              Already have an account?{" "}
              <Link to="/auth/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      </Container>
    </>
  );
};

export default Register;