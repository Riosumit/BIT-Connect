import { useState, useContext } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';

const Auth = ({ closeAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  const changeTo = (loc) => {
    setIsLogin(loc === "login");
  };

  return (
    <div className="container mx-auto w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-10">
      <nav className="flex justify-around mb-6">
        <h1 onClick={() => changeTo('login')} className={`${isLogin ? 'border-b-2 border-blue-500' : ''} cursor-pointer w-1/2 text-center py-2 text-lg font-semibold`}>
          Login
        </h1>
        <h1 onClick={() => changeTo('signup')} className={`${!isLogin ? 'border-b-2 border-blue-500' : ''} cursor-pointer w-1/2 text-center py-2 text-lg font-semibold`}>
          Signup
        </h1>
      </nav>
      <div className="mx-auto">
        {isLogin ? <LoginForm closeAuth={closeAuth} /> : <SignupForm closeAuth={closeAuth} />}
      </div>
    </div>
  );
};

const LoginForm = ({ closeAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let status = login(email, password);
    if(status == 'LogIn Successfull'){
      closeAuth();
    }
    else{
      setError(status);
    }
  };

  return (
    <div className="mt-8 p-4">
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <div className="absolute top-10 right-2 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => closeAuth()}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

const SignupForm = ({ closeAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let status = signup(fullName, email, password);
    if(status == 'SignUp Successfull'){
      closeAuth();
    }
    else{
      setError(status);
    }
  };

  return (
    <div className="mt-8 p-4">
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          <div className="absolute top-10 right-2 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Signup
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => closeAuth()}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
