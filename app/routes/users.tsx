// app/routes/users.tsx
import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const API_URL = 'http://localhost:3001/api';

export default function Users() {
  // ... other states remain the same ...
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'driver' });

  // ... fetchUsers and other functions remain the same ...
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      const formattedData = data.map((user: any) => ({
        ...user,
        createdAt: new Date(user.createdAt).toISOString()
      }));
      setUsers(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      setUsers(prev => [{
        ...data,
        createdAt: new Date(data.createdAt).toISOString()
      }, ...prev]);
      setNewUser({ name: '', email: '', role: 'driver' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Users</h1>
        
        <div className="w-full max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-200 mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-200 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full p-2 border rounded bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="driver" className="text-white bg-gray-700">Driver</option>
                  <option value="sponsor" className="text-white bg-gray-700">Sponsor</option>
                  <option value="admin" className="text-white bg-gray-700">Admin</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
              >
                Add User
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {users.map(user => (
              <div key={user.id} className="bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                    <p className="text-gray-300">{user.email}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Joined: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 
                      ${user.role === 'admin' ? 'bg-red-200 text-red-900' : 
                        user.role === 'sponsor' ? 'bg-purple-200 text-purple-900' : 
                        'bg-blue-200 text-blue-900'}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-400 hover:text-red-300 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}