import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        course: university,
      });

      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Registration failed. Please check your details.');
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

      {/* Registration Card */}
      <div className="w-full max-w-md bg-[#F3F7F0] rounded-3xl p-8 sm:p-10 border border-[#E0E8DC] shadow-paper text-left">
        <div className="mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2D5A45]">
            Registration
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1E2B24] tracking-tight mt-1">
            Join the Crew
          </h1>
          <p className="text-xs text-[#52665B] font-medium mt-1">
            Create an account to collaborate on team milestones.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-2xl bg-[#FDF2F2] border border-[#F8B4B4] text-[#9B1C1C] text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            type="text"
            required
            placeholder="Nupur"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Course / Team"
            type="text"
            required
            placeholder="MERN Stack Lab"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />

          <Input
            label="Student Email"
            type="email"
            required
            placeholder="nupur@crewboard.dev"
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
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </div>

      {/* Footer link */}
      <p className="text-xs font-semibold text-[#52665B] mt-8">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#2D5A45] hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
