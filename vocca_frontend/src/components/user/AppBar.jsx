import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LogComponent from "./LogComponent";

const navigation = {
  pages: [
    { name: "Home", href: "/home" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "#about-us", isScroll: true },
    { name: "Contact Us", href: "#about-us", isScroll: true },
  ],
};

export default function Example() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white relative z-40">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-6 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white z-40">
        <nav aria-label="Top" className="max-w-9xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/home">
                  <img
                    alt=""
                    src="../../../public/vocca.svg"
                    className="h-6 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center space-x-4 z-30">
                {/* Search */}
                <div className="flex">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Favorite */}
                <div className="flex">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Favorites</span>
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Cart */}
                <div className="flex">
                  <button className="group flex items-center p-2">
                    <ShoppingCartIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {/* Avatar/Login */}
                <div className="flex">
                  <LogComponent />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
