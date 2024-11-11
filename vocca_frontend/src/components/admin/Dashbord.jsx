import React, { useState } from 'react';
import {
  LayoutDashboard, Users, ShoppingCart, Package, PlusCircle,
  Settings, LogOut, Tag, Image, ChevronRight, ChevronLeft, Menu, X
} from 'lucide-react';
import UserList from './Allusers';
import AddProduct from './AddProduct';
import ProductList from './AllProduct';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Users, label: 'All Users' },
    { icon: ShoppingCart, label: 'All Orders' },
    { icon: Package, label: 'All Products' },
    { icon: PlusCircle, label: 'Add Products' },
    { icon: Settings, label: 'Settings' },
    { icon: Tag, label: 'Offers' },
    { icon: Image, label: 'Images' },
    { icon: LogOut, label: 'Logout' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuItemClick = (label) => {
    setSelectedMenuItem(label);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'All Users':
        return <UserList />;
      case 'Add Products':
        return <AddProduct />;
        case 'All Products':
            return <ProductList />;
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Welcome to {selectedMenuItem}</h2>
            <p className="text-gray-600">This is the {selectedMenuItem} section.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile (drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="font-bold text-xl">Admin Panel</h2>
          <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-indigo-700 lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleMenuItemClick(item.label)}
                  className={`w-full flex items-center p-4 hover:bg-indigo-700 transition-colors duration-200 ${
                    selectedMenuItem === item.label ? 'bg-indigo-700' : ''
                  }`}
                >
                  <item.icon size={24} />
                  <span className="ml-4">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md p-4">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-200 lg:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold ml-4">{selectedMenuItem}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <div className="container mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;