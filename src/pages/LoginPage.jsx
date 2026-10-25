import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 selection:bg-[#B5D0AF] selection:text-[#1E2B24] font-sans">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <div className="w-10 h-10 rounded-2xl bg-[#2D5A45] text-white flex items-center justify-center text-lg font-serif font-bold shadow-sm group-hover:scale-105 transition-transform">
          C
        </div>
        <span className="font-serif text-3xl font-bold tracking-tight text-[#1E2B24]">
          CrewBoard
        </span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#F3F7F0] rounded-3xl p-8 sm:p-10 border border-[#E0E8DC] shadow-paper text-left">
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
            Sign In
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1E2B24] tracking-tight mt-1">
            Welcome back
          </h1>
          <p className="text-xs text-[#52665B] font-medium mt-1">
            Access your team workspace and sprint board.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            className="w-full mt-2 font-bold shadow-sm"
          >
            {isSubmitting ? 'Entering Workspace...' : 'Enter Workspace'}
          </Button>
        </form>
      </div>

      {/* Footer link */}
      <p className="text-xs font-semibold text-[#52665B] mt-8">
        New team member?{' '}
        <Link to="/register" className="font-bold text-[#2D5A45] hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
