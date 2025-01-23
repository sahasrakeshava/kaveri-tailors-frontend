/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Drawer, Menu, MenuItem } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { navigation } from '../../../Data/navigation.js'
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, googleLogout, logout } from '../../../State/Auth/Action';
import SearchModal from './search';
import { getCart } from '../../../State/Cart/Action.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const { cart } = useSelector(store => store.cart)

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget); // Correct the spelling here
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close()
  };
  const handleLogout = () => {
    if (!auth?.user.googleId) {
      dispatch(logout())
    }
    else {
      dispatch(googleLogout())
    }
    handleCloseUserMenu()
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      dispatch(getUser(jwt))
    }

  }, [])

  useEffect(() => {
    setTimeout(() => {
      const uId = auth?.user?._id;
      dispatch(getCart(uId));
    }, 1000);
  }, [auth?.user])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (open && !event.target.closest('.MuiDrawer-paper')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [open]);


  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        classes={{ paper: "w-64" }}
      >
        <div className="p-4">
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-gray-400 rounded-md"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex mb-4 ml-4 lg:ml-0">
            <a href="/">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="w-auto h-8" />
            </a>
          </div>

          {/* Navigation Categories */}
          <div className="mt-4 space-y-4">
            {navigation.categories.map((category) => (
              <div key={category.name}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        {category.name}
                        <ChevronDownIcon
                          className={`w-5 h-5 transform ${open ? "rotate-180" : ""}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pl-4 mt-2 space-y-2">
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p className="font-medium text-gray-900">{section.name}</p>
                            <ul role="list" className="mt-2 space-y-1">
                              {section.items.map((item) => (
                                <li key={item.name}>
                                  <p
                                    onClick={() => {
                                      handleCategoryClick(
                                        category,
                                        section,
                                        item,
                                        () => setOpen(false)
                                      );
                                    }}
                                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>

          {/* User Account Options */}
          <div className="pt-4 mt-6 border-t border-gray-200">
            {auth.user?.firstName ? (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                      Account
                      <ChevronDownIcon
                        className={`w-5 h-5 transform ${open ? "rotate-180" : ""}`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="pl-4 mt-2 space-y-2">
                      <Button
                        className="w-full text-left"
                        onClick={() => {
                          navigate("/account");
                          setOpen(false);
                        }}
                      >
                        Profile
                      </Button>
                      <Button
                        className="w-full text-left"
                        onClick={() => {
                          navigate("/account/order");
                          setOpen(false);
                        }}
                      >
                        My Orders
                      </Button>
                      <Button
                        className="w-full text-left"
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <Button
                className="w-full text-left"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>

        </div>
      </Drawer>


      <header className="relative bg-white">
        <nav aria-label="Top" className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="p-2 text-gray-400 bg-white rounded-md lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="w-6 h-6" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={logo}
                    className="w-auto h-8"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="z-10 hidden lg:ml-8 lg:block lg:self-strech">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in suration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel
                              className="absolute inset-x-0 text-sm text-gray-500 top-full"
                            >
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div aria-hidden="true" className="absolute inset-0 bg-white shadow top-1/2" />

                              <div className="relative bg-white">
                                <div className="px-8 mx-auto max-w-7xl">
                                  <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                    <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <p
                                                  onClick={() => handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                  }
                                                  className='cursor-pointer hover:text-gray-800'
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex items-center ml-auto">
                <div className="flex items-center ml-auto sm:mr-4">
                  {auth.user?.firstName ? (
                    <div>
                      <Avatar
                        className="text-white"
                        onClick={handleUserClick}
                        aria-controls={openUserMenu ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUserMenu ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth.user?.firstName[0].toUpperCase()}
                      </Avatar>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate("/account")}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate("/account/order")}>My Orders</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div>
                      <Button
                        onClick={() => navigate("/login")}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
                {/* Search */}
                <div className="flex lg:ml-6">
                  <p className='p-2 text-gray-400 hover:text-gray-500' >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="w-6 h-6" onClick={() => setOpenSearchModal(true)} />
                  </p>
                </div>

                {/* Cart */}
                <div className="flow-root ml-4 lg:ml-6"
                  onClick={() => navigate("/cart")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}>
                  <Button className="flex items-center p-2 -m-2 group" >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.cartItems?.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SearchModal open={openSearchModal} handleClose={() => setOpenSearchModal(false)} />
    </div>
  )
}
