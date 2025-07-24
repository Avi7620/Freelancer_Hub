import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
      <div className="w-[400px] bg-[#111111] text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-neutral-800 text-white py-2 rounded-md hover:bg-neutral-700 mb-5"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="flex items-center mb-5">
          <div className="flex-grow border-t border-gray-700" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-700" />
        </div>

        <form className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full h-10 px-3 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBB7B]"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full h-10 px-3 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBB7B]"
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-10 px-3 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBB7B]"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full h-10 px-3 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBB7B]"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 rounded-md bg-neutral-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5BBB7B]"
            />
          </div>

          <div className="flex items-center text-sm text-gray-300">
            <input type="checkbox" className="mr-2 w-4 h-4 accent-[#5BBB7B]" />
            <label>I agree to terms and conditions</label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5BBB7B] hover:bg-[#4da86e] text-white font-medium py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5BBB7B] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
