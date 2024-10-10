import React, { useState } from "react";
import Html5QrcodePlugin from "./qs";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const Index: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="App">
      <QrCodeScannerIcon sx={{ width: '100px', cursor: 'pointer',color:"#fff",fontSize:"2.5rem" }} onClick={()=>setShowModal(true)} />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={()=>setShowModal(false)}>&times;</span>
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              qrCodeSuccessCallback={(decodedText: string) => window.open(decodedText,"_self")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
