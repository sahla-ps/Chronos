import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccountMenu from "../components/account/AccountMenu";
import ProfileForm from "../components/account/ProfileForm";
import SavedAddress from "../components/account/SavedAddress";
import ChangePassword from "../components/account/ChangePassword";

function Account() {
  const [tab, setTab] = useState("My Profile");

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    photo: "",
  });

  return (
    <>
      <Navbar solid />

      <main className="bg-white text-black">
        <div className="bg-neutral-100 py-8 text-center">
          <h1 className="text-[20px] font-medium">My Account</h1>
        </div>

        <div className="grid gap-10 px-6 py-12 md:grid-cols-[300px_minmax(0,1fr)] md:px-0 md:py-0">
          <AccountMenu active={tab} onSelect={setTab} />

          <div className="md:px-10 md:py-5 md:pb-24">
            {tab === "My Profile" && (
              <ProfileForm
                initialValues={profileData}
                onSave={setProfileData}
              />
            )}

            {tab === "Saved Address" && (
              <SavedAddress profileData={profileData} />
            )}

            {tab === "Change Password" && <ChangePassword />}

            {tab !== "My Profile" && tab !== "Saved Address"}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Account;