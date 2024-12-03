import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { navigation } from '../../../Data/navigation'
import logo from './logo.png'
import { useLocation, useNavigate } from 'react-router-dom';
import AuthModel from '../../Auth/AuthModel';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../../State/Auth/Action';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store => store)
  const dispatch = useDispatch()
  const location = useLocation()

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget); // Correct the spelling here
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };
  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close()
  };
  const handleLogout = () => {
    dispatch(logout())
    handleCloseUserMenu()
  }
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])
  useEffect(() => {
    if (auth.user) {
      handleClose()
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1)
    }
  }, [auth.user])

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl flex-clo">
                <div className='flex px-4 pt-5 pb-2'>
                  <button
                    type='button'
                    className="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span classname="sr-only">Close Menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className='border-b border-gray-200'>
                    <Tab.List className="flex px-4 -mb-px space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="px-4 pt-10 pb-8 space-y-10"
                      >
                        <div className='grid grid-cols-2 gap-x-4'>
                          {category.featured.map((item) => (
                            <div className='relative text-sm group' key={item.name}>
                              <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="block mt-6 font-medium text-gray-900">
                                <span className='absolute inset-0 z-10' aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className='font-medium text-gray-900'>
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className='flex flex-col mt-6 space-y-6'
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p className='block p-2 -m-2 text-gray-500'>
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div classname="px-4 py-6 space-y-6 border-t border-gray-200">
                  {navigation.pages.map((page) => (
                    <div key={page.name} classname="flow-root">
                      <a href={page.href}
                        className='block p-2 -m-2 font-medium text-gray-900'
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                  <div className='flow-root'>
                    <a href="/"
                      className="block p-2 -m-2 font-medium text-gray-900">
                      Sign In
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

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
                                    <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="relative text-base group sm:text-sm">
                                          <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1 group-hover:opacity-75">
                                            <img
                                              alt={item.imageAlt}
                                              src={item.imageSrc}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="block mt-6 font-medium text-gray-900">
                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
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

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex items-center ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
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
                        anchorEl={anchorEl} // This should be set correctly now
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                          vertical: "bottom", // Position the menu below the avatar
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top", // Align the menu's top with the anchor's bottom
                          horizontal: "center",
                        }}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate("/account/order")}>My Orders</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium tesxt-gray-700 hover:text-gray-800">
                      Sign In
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <p className='p-2 text-gray-400 hover:text-gray-500'>
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="w-6 h-6" />
                  </p>
                </div>

                {/* Cart */}
                <div className="flow-root ml-4 lg:ml-6">
                  <Button className="flex items-center p-2 -m-2 group">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModel handleClose={handleClose} open={openAuthModal} />
    </div>
  )
}
