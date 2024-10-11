import { useSelector } from "react-redux";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaGlobeAmericas } from "react-icons/fa";
import { ProfileField } from "./ProfileField";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        No user data available.
      </div>
    );
  }

  const handleGeoLocationClick = () => {
    const { lat, long } = user.address.geolocation;
    window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${long}`, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white">
        <h2 className="text-3xl font-bold">User Profile</h2>
        <p className="text-sm opacity-80">Manage your account information</p>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField icon={<FaUser />} label="Username" value={user.username} />
          <ProfileField icon={<FaEnvelope />} label="Email" value={user.email} />
          <ProfileField icon={<FaIdCard />} label="Name" value={`${user.name.firstname} ${user.name.lastname}`} />
          <ProfileField icon={<FaPhone />} label="Phone" value={user.phone} />
          <ProfileField 
            icon={<FaMapMarkerAlt />} 
            label="Address" 
            value={`${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            fullWidth
          />
          <ProfileField 
            icon={<FaGlobeAmericas />} 
            label="Geolocation" 
            value={`${user.address.geolocation.lat}, ${user.address.geolocation.long}`}
            fullWidth
            customContent={
              <div className="mt-2">
                <div 
                  className="relative w-full h-40 bg-blue-100 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={handleGeoLocationClick}
                  title="Click to open in Google Maps"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                    Lat: {user.address.geolocation.lat}, Long: {user.address.geolocation.long}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Open in Google Maps
                    </span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
