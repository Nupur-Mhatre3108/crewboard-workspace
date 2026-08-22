import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
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
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            className="w-full mt-2 font-bold shadow-sm"
          >
            Create Account
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
