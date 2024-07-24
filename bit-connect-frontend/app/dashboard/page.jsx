'use client'
import React, { useState } from 'react';
import Navbar from '@/components/navbar/page';

// Sample data
const sampleData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Software Developer at XYZ Company',
  profession: 'Software Developer',
  company: 'XYZ Company',
  location: 'San Francisco, CA',
  posts: ['Post 1', 'Post 2', 'Post 3'],
  doubts: ['Doubt 1', 'Doubt 2'],
  profilePicture: '/path/to/profile-picture.jpg', // Sample profile picture path
};

const Dashboard = () => {
  const [userData, setUserData] = useState(sampleData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [activeSection, setActiveSection] = useState('profile'); // State to manage active section

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditData(userData); // Reset editData to current userData
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <aside className="w-1/4 h-screen p-6 bg-gray-800 text-white">
          <h2 className="font-bold text-2xl mb-6">Dashboard</h2>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('profile')}
                className={`text-left w-full p-2 rounded ${activeSection === 'profile' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
              >
                Profile
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('community-posts')}
                className={`text-left w-full p-2 rounded ${activeSection === 'community-posts' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
              >
                Community Posts
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveSection('doubts')}
                className={`text-left w-full p-2 rounded ${activeSection === 'doubts' ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
              >
                Doubts
              </button>
            </li>
          </ul>
        </aside>

        <main className="w-3/4 p-8">
          {activeSection === 'profile' && (
            <section id="profile">
              <h2 className="font-bold text-3xl mb-6">Profile</h2>
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mr-6 border-2 border-gray-300"
                />
                {isEditing ? (
                  <div className="flex-1">
                    <label className="block mb-4">
                      Name:
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <label className="block mb-4">
                      Email:
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <label className="block mb-4">
                      Bio:
                      <textarea
                        name="bio"
                        value={editData.bio}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <label className="block mb-4">
                      Profession:
                      <input
                        type="text"
                        name="profession"
                        value={editData.profession}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <label className="block mb-4">
                      Company:
                      <input
                        type="text"
                        name="company"
                        value={editData.company}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <label className="block mb-4">
                      Location:
                      <input
                        type="text"
                        name="location"
                        value={editData.location}
                        onChange={handleInputChange}
                        className="border p-2 w-full rounded"
                      />
                    </label>
                    <button onClick={handleSave} className="bg-blue-500 text-white p-2 mt-4 rounded">Save</button>
                    <button onClick={handleEditToggle} className="bg-gray-500 text-white p-2 mt-4 ml-4 rounded">Cancel</button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <p className="mb-4"><strong>Name:</strong> {userData.name}</p>
                    <p className="mb-4"><strong>Email:</strong> {userData.email}</p>
                    <p className="mb-4"><strong>Bio:</strong> {userData.bio}</p>
                    <p className="mb-4"><strong>Profession:</strong> {userData.profession}</p>
                    <p className="mb-4"><strong>Company:</strong> {userData.company}</p>
                    <p className="mb-4"><strong>Location:</strong> {userData.location}</p>
                    <button onClick={handleEditToggle} className="bg-blue-500 text-white p-2 mt-4 rounded">Edit</button>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeSection === 'community-posts' && (
            <section id="community-posts" className="mt-8">
              <h2 className="font-bold text-3xl mb-6">Community Posts</h2>
              <ul className="bg-white p-6 rounded-lg shadow-md">
                {userData.posts.map((post, index) => (
                  <li key={index} className="mb-4 p-4 border-b last:border-none">{post}</li>
                ))}
              </ul>
            </section>
          )}

          {activeSection === 'doubts' && (
            <section id="doubts" className="mt-8">
              <h2 className="font-bold text-3xl mb-6">Doubts</h2>
              <ul className="bg-white p-6 rounded-lg shadow-md">
                {userData.doubts.map((doubt, index) => (
                  <li key={index} className="mb-4 p-4 border-b last:border-none">{doubt}</li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
