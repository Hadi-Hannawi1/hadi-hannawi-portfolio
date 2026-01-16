import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component is effectively deprecated as the admin feature has been removed.
// It remains as a placeholder to prevent build errors if the file is still present.
const Admin: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Admin;