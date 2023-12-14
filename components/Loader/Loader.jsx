import { BeatLoader } from 'react-spinners'; // Importing the BeatLoader component from the react-spinners library

const Loader = () => { // Creating a functional component called Loader
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Creating a div element with inline styles for centering the loader */}
      <BeatLoader color="#FF5733" size={15} /> {/* Rendering the BeatLoader component with color and size props */}
    </div>
  );
};

export default Loader; // Exporting the Loader component to be used in other files

