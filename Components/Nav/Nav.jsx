"use client";
import {
  Button,
  Avatar,
  Dropdown,
  Label,
  Input,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3 as MenuIcon } from "react-icons/hi";
import { RxCross2, RxAvatar } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

// ১. কারেন্ট পেজের পাথ ট্র্যাক করার জন্য usePathname ইম্পোর্ট করা হলো
import { usePathname } from "next/navigation";

// Gravity UI Icons
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [profileData, setProfileData] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      toast.success("Profile updated successfully!");
      setProfileOpen(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    ...(user
      ? [
          { name: "Add Idea", path: "/add-idea" },
          { name: "My Ideas", path: "/my-ideas" },
          { name: "My Interactions", path: "/my-interactions" },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Successfully signed out!");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        },
        onError: () => {
          toast.error("Failed to sign out. Please try again.");
        },
      },
    });
  };

  const handleDropdownAction = (key) => {
    if (key === "profile") {
      setProfileOpen(true);
    } else if (key === "logout") {
      handleSignOut();
    }
  };

  return (
    <nav className="px-4 py-3 relative border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <ToastContainer />
      <div className="max-w-6xl mx-auto flex items-center justify-between h-10">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Idea <span className="text-violet-500">Vault.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={link.path}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger className="cursor-pointer rounded-full outline-none">
                <Avatar>
                  <Avatar.Image
                    alt={profileData.name}
                    src={profileData.image}
                  />
                  <Avatar.Fallback>
                    {profileData.name?.charAt(0) || "U"}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={profileData.name}
                        src={profileData.image}
                      />
                      <Avatar.Fallback>
                        {profileData.name?.charAt(0) || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0 max-w-[150px]">
                      <p className="text-sm leading-5 font-medium truncate">
                        {profileData.name}
                      </p>
                      <p className="text-xs leading-none text-neutral-400 dark:text-neutral-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu
                  aria-label="User Actions"
                  onAction={handleDropdownAction}
                >
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Label>Dashboard</Label>
                  </Dropdown.Item>

                  <Dropdown.Item id="profile" textValue="Profile">
                    <Label>Profile</Label>
                  </Dropdown.Item>

                  <Dropdown.Item id="settings" textValue="Settings">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Settings</Label>
                      <Gear className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="new-project" textValue="New project">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Create Team</Label>
                      <Persons className="size-3.5 text-neutral-400 dark:text-neutral-500" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Log Out</Label>
                      <ArrowRightFromSquare className="size-3.5 text-red-500" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <div>
                <RxAvatar
                  size={30}
                  className="text-neutral-400 dark:text-neutral-500"
                />
              </div>

              <Link href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium"
                >
                  Login
                </Button>
              </Link>

              <Link href="/registration">
                <Button
                  size="sm"
                  className="bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Button
            isIconOnly
            variant="light"
            className="lg:hidden text-neutral-600 dark:text-neutral-300"
            onClick={() => setOpen(!isOpen)}
          >
            {isOpen ? <RxCross2 size={20} /> : <MenuIcon size={20} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-neutral-100 dark:border-neutral-800 mt-3"
          >
            <div className="p-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className="py-2 px-4 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {user && (
        <Modal
          isOpen={isProfileOpen}
          onOpenChange={setProfileOpen}
          placement="auto"
        >
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <Modal.CloseTrigger className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200" />
                <Modal.Header className="pb-2">
                  <Modal.Icon className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                    <Persons className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading className="text-neutral-900 dark:text-white">
                    Update Profile
                  </Modal.Heading>
                  <p className="mt-1.5 text-sm leading-5 text-neutral-500 dark:text-neutral-400">
                    Update your personal profile information here. Changes will
                    apply immediately.
                  </p>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <Surface variant="default" className="bg-transparent">
                    <form
                      onSubmit={handleUpdateProfile}
                      className="flex flex-col gap-4"
                    >
                      {/* ১. Name ফিল্ড */}
                      <TextField
                        className="w-full"
                        name="name"
                        variant="secondary"
                      >
                        <Label className="text-neutral-700 dark:text-neutral-300">
                          Name
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="bg-neutral-50 dark:bg-neutral-800"
                        />
                      </TextField>

                      {/* ২. Email ফিল্ড (Disabled) */}
                      <TextField
                        className="w-full text-neutral-400"
                        name="email"
                        variant="secondary"
                        isDisabled
                      >
                        <Label className="text-neutral-400 dark:text-neutral-500">
                          Email (Cannot be changed)
                        </Label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          defaultValue={user.email || ""}
                          className="bg-neutral-100 dark:bg-neutral-800/50 cursor-not-allowed"
                        />
                      </TextField>

                      {/* ৩. Profile Image URL ফিল্ড */}
                      <TextField
                        className="w-full"
                        name="image"
                        variant="secondary"
                      >
                        <Label className="text-neutral-700 dark:text-neutral-300">
                          Profile Image URL
                        </Label>
                        <Input
                          type="text"
                          name="image"
                          placeholder="Enter image URL"
                          value={profileData.image}
                          onChange={handleInputChange}
                          className="bg-neutral-50 dark:bg-neutral-800"
                        />
                      </TextField>

                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => {
                            setProfileData({
                              name: user.name || "",
                              image: user.image || "",
                            });
                            setProfileOpen(false);
                          }}
                          className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-violet-500 hover:bg-violet-600 text-white"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </Surface>
                </Modal.Body>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      )}
    </nav>
  );
};

export default Nav;
