import PropTypes from 'prop-types';

export const ProfileField = ({ icon, label, value, fullWidth = false, customContent = null }) => (
  <div className={`flex flex-col bg-gray-100 p-4 rounded-lg ${fullWidth ? 'col-span-full' : ''}`}>
    <div className="flex items-center space-x-4">
      <div className="text-gray-600 text-xl">{icon}</div>
      <div className="flex-grow">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-medium text-black">{value}</p>
      </div>
    </div>
    {customContent && <div className="mt-2">{customContent}</div>}
  </div>
);

ProfileField.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  customContent: PropTypes.node,
};